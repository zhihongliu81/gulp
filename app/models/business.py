from .db import db

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.String(10))
    country = db.Column(db.String(50))
    phone_number = db.Column(db.String(20), nullable=False)
    website = db.Column(db.String(255))
    min_price = db.Column(db.DECIMAL(5, 2))
    max_price = db.Column(db.DECIMAL(5, 2))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    user = db.relationship("User", back_populates="businesses")
    reviews = db.relationship("Review", back_populates="business", cascade="all, delete")
    images = db.relationship("Image", back_populates="business", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'country': self.country,
            'phoneNumber': self.phone_number,
            'website': self.website,
            'minPrice': str(self.min_price),
            'maxPrice': str(self.max_price),
            'createdAt': self.created_at,
            'reviews': [review.to_dict() for review in self.reviews],
            'images': [image.to_dict() for image in self.images]
        }
