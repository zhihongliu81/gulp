from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Business


class CreateBusinessForm(FlaskForm):
    name = StringField("name",validators=[DataRequired(message='Name is required')])
    address = StringField("address",validators=[DataRequired(message='Address is required')])
    city = StringField("city",validators=[DataRequired(message='City is required')])
    state = StringField("State",validators=[DataRequired(message='State is required')])
    zipcode = StringField("zipcode",validators=[DataRequired(message='Zipcode is required'), Length(min=5, max=5, message="Zipcode is 5 numbers")])
    country = StringField("country",validators=[DataRequired(message='Country is required')])
    phone_number = StringField("phone number",validators=[DataRequired(message='Phone number is required'), Length(min=10, max=10, message="Phone number is 10 numbers")])
    website = StringField("website",validators=[DataRequired(message='Website is required')])
    min_price = DecimalField("min_price", validators=[DataRequired(message='Min price is required')])
    max_price = DecimalField("max_price", validators=[DataRequired(message='Max price is required')])
