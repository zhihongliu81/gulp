from flask import Blueprint, jsonify, session, request
from app.models import User, business, db, Business
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

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
        return {'errors': ['business can not be found']},404

    return business.to_dict()


#get all comments of one business by business id
@business_routes.route('/<int:business_id>/reviews')
def get_all_comments(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['business can not be found']},404

    reviews = {}
    for review in business.reviews:
        reviews[review.id] = review.to_dict()

    return reviews


#get all images of one business by business id
@business_routes.route('/<int:business_id>/images')
def get_all_images(business_id):
    business = Business.query.get(business_id)
    if not business:
        return {'errors': ['business can not be found']},404

    images = {}
    for image in business.images:
        images[image.id] = image.to_dict()

    return images
