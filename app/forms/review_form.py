from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Review

class ReviewForm(FlaskForm):
    rating =IntegerField("rating", validators=[DataRequired(message='Rating is required')])
    content = StringField("content",validators=[DataRequired(message='Zipcode is required'), Length( max=2000, message="Length of review content should be less than 2000 letters")])
