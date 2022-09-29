from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Business
from flask_login import current_user

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    if id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    user = User.query.get(id)
    businesses = {}
    for business in user.businesses:
        businesses[business.id] = business.to_dict()

    reviews = {}
    review_business_ids = set()
    for review in user.reviews:
        review_business_ids.add(review.business_id)
        reviews[review.id] = review.to_dict()

    review_businesses = Business.query.filter(Business.id.in_(list(review_business_ids)))
    review_business_dict = {}
    for ele in review_businesses:
        review_business_dict[ele.id] = ele.to_dict()

    for review in reviews.values():

        review['business'] = review_business_dict[review['businessId']]

    return {'user':user.to_dict(), 'businesses': businesses, 'reviews': reviews}
