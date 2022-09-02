from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id", ondelete="CASCADE"), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    user = db.relationship("User", back_populates="reviews")
    business = db.relationship("Business", back_populates="reviews")
    images = db.relationship("Image", back_populates="review", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'businessId': self.business_id,
            'content': self.content,
            'rating': self.rating,
            'createdAt': self.created_at,
            'user': self.user.to_dict()
        }
