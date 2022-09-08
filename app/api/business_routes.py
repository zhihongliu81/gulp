from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.forms.review_form import ReviewForm
from app.models import User, db, Business, Image
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.AWS_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms import CreateBusinessForm
from app.models.review import Review
from .auth_routes import validation_errors_to_error_messages
import json
from urllib.parse import parse_qs

business_routes = Blueprint('business', __name__)


#get all businesses
@business_routes.route('/')
def get_all_businesses():
    businesses = Business.query.all()
    res = {}

    for business in businesses:
        res[business.id] = business.to_dict()

    return res


#get one business detail by business id
@business_routes.route('/<int:business_id>')
def get_one_business(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['Business can not be found']},404

    return business.to_dict()


#get all comments of one business by business id
@business_routes.route('/<int:business_id>/reviews')
def get_all_comments(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['Business can not be found']},404

    reviews = {}
    for review in business.reviews:
        reviews[review.id] = review.to_dict()

    return reviews


#get all images of one business by business id
@business_routes.route('/<int:business_id>/images')
def get_all_images(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['Business can not be found']},404

    images = {}
    for image in business.images:
        images[image.id] = image.to_dict()

    return images


#add images to AWS, return the url when sucessful
@business_routes.route('/addImages', methods=['POST'])
@login_required
def add_images():
    if "image" not in request.files:
        return {"errors": ["Image required"]}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["File type not permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request

    # new_image = Image(user=current_user, url=url)
    # db.session.add(new_image)
    # db.session.commit()
    return {"url": url}


#create a new business
@business_routes.route('/new', methods=['POST'])
@login_required
def create_business():
    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business = Business(
           name = form.data['name'],
           address = form.data['address'],
           city = form.data['city'],
           state = form.data['state'],
           zipcode = form.data['zipcode'],
           country = form.data['country'],
           phone_number = form.data['phone_number'],
           website = form.data['website'],
           min_price = form.data['min_price'],
           max_price = form.data['max_price'],
           user_id = current_user.id,
        )
        db.session.add(business)
        db.session.commit()

        images = request.json['images']
        if len(images) == 0 :
            return {"errors": ["At least one image required"]}, 400
        for ele in images:
            image = Image(
                user_id = current_user.id,
                business_id = business.id,
                url = ele
            )
            db.session.add(image)
        db.session.commit()
        return business.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#edit a business
@business_routes.route('/<int:business_id>/edit', methods=['PUT'])
@login_required
def edit_business(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['Business can not be found']},404
    if business.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business.name = form.data['name']
        business.address = form.data['address']
        business.city = form.data['city']
        business.state = form.data['state']
        business.zipcode = form.data['zipcode']
        business.country = form.data['country']
        business.phone_number = form.data['phone_number']
        business.website = form.data['website']
        business.min_price = form.data['min_price']
        business.max_price = form.data['max_price']
        business.user_id = current_user.id

        db.session.commit()

        images = request.json['images']
        for ele in images:
            image = Image(
                user_id = current_user.id,
                business_id = business_id,
                url = ele
            )
            db.session.add(image)
        db.session.commit()

        return business.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#delete a business
@business_routes.route('/<int:business_id>', methods=['DELETE'])
@login_required
def delete_business(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['Business cannot be found']}, 400

    if business.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(business)
    db.session.commit()
    return {"message":"Successfully deleted"}


#create a review
@business_routes.route('/<int:business_id>/reviews/new', methods=['POST'])
@login_required
def create_review(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['Business cannot be found']}, 400

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            rating = form.data['rating'],
            content = form.data['content']
        )
        review.user_id = current_user.id
        review.business_id = business_id
        db.session.add(review)
        db.session.commit()

        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#edit a review
@business_routes.route('/<int:business_id>/reviews/<int:review_id>', methods=['PUT'])
@login_required
def update_review(business_id, review_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['Business can not be found']}, 404

    review = Review.query.get(review_id)
    if not review:
        return {'errors': ['Review can not be found']}, 404

    if review.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.rating = form.data['rating']
        review.content = form.data['content']
        db.session.commit()

        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#delete a review
@business_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return {'errors': ['Review cannot be found']}, 400

    if review.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(review)
    db.session.commit()
    return {"message":"Successfully deleted"}


# search businesses
@business_routes.route('/search')
def search_business():
    query_paras = request.query_string.decode("utf-8")
    query_data= parse_qs(query_paras)

    res ={}
    businesses = Business.query.filter()
    if 'name' in query_data:
        businesses = businesses.filter(Business.name.ilike(f'%{query_data["name"][0]}%'))
    if 'city' in query_data:
        businesses = businesses.filter(Business.city.ilike(f'%{query_data["city"][0]}%'))
    if 'state' in query_data:
        businesses = businesses.filter(Business.state.ilike(f'%{query_data["state"][0]}%'))


    for business in businesses:
        res[business.id] = business.to_dict()

    return  res
