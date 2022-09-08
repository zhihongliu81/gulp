from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first name', validators=[DataRequired(message='First name is required'), Length(min=1,max=50, message='The length of first name should be 1 to 50')])
    last_name = StringField(
        'last name', validators=[DataRequired(message='Last name is required'), Length(min=1,max=50, message='The length of last name should be 1 to 50')])
    email = StringField('email', validators=[DataRequired(message='Email is required'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Password is required')])
