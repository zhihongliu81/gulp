import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Rating } from 'react-simple-star-rating';
import { createReviewThunk, updateReviewThunk } from '../../store/review';

export default function ReviewForm({close,businessId, business, reviewId, action, review}) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(action === 'create'? 0 :(review.rating * 20)); // initial rating value
    const [content, setContent] = useState(action === 'create' ? '' : review.content);
    const [errors, setErrors] = useState([]);

    // Catch Rating value
    const head = action === 'create' ? <h2>Write a Review of {business.name}</h2>: <h2>Update a Review of {business.name}</h2>;
    const handleRating = (rate) => {
        const newRate = rate / 20
        setRating(newRate)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const review = {
            rating,
            content
        }
        if (action === 'create') {
            dispatch(createReviewThunk(businessId, review))
            .then(
                (res) => {
                    if (res.errors){
                        setErrors(res.errors)
                    }else{
                        close()
                    }
                }
            )
        } else {
            dispatch(updateReviewThunk(businessId, reviewId, review))
            .then(
                (res) => {
                    if (res.errors){
                        setErrors(res.errors)
                    }else{
                        close()
                    }
                }
            )
        }


    }

  return (
    <div className='App'>
          {head}
          <form onSubmit={handleSubmit}>
              <Rating onClick={handleRating} ratingValue={rating} />
              <input
                  type={'textarea'}
                  value={content}
                  placeholder="Add comment......"
                  onChange={e => setContent(e.target.value)}
              />
              <button type='submit'>POST</button>
              <button type='button' onClick={close}>Cancle</button>
          </form>
    </div>
  )
}
