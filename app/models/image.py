from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id", ondelete="CASCADE"), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id", ondelete="CASCADE"))
    url = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="images")
    business = db.relationship("Business", back_populates="images")
    review = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'businessId': self.business_id,
            'review_id': self.review_id,
            'url': self.url
        }
