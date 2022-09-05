import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Rating } from 'react-simple-star-rating';
import { createReviewThunk, updateReviewThunk } from '../../store/review';

export default function ReviewForm({close,businessId, business, reviewId, action, review}) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(action === 'create'? 0 :(review.rating * 20)); // initial rating value
    const [content, setContent] = useState(action === 'create' ? '' : review.content);
    const [errors, setErrors] = useState([]);

    const [ratingValidationErrors, setRatingValidationErrors] = useState([]);
    const [contentValidationErrors, setContentValidationErrors] = useState([]);

    const [showRatingErrors, setShowRatingErrors] = useState(false);
    const [showContentErrors, setShowContentErrors] = useState(false);

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (rating.length === 0) errors.push("Rating is required");
        setRatingValidationErrors(errors);
    }, [rating])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (content.length === 0) errors.push("Content is required");
        if (content.length > 2000) errors.push("Content must be 2000 characters or less")
        setContentValidationErrors(errors);
    }, [content])

    // Catch Rating value
    const head = action === 'create' ? <h2>Write a Review of {business.name}</h2>: <h2>Update a Review of {business.name}</h2>;
    const handleRating = (rate) => {
        const newRate = rate / 20
        setRating(newRate)
        setShowRatingErrors(true)
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
              <ul>
                  {errors.map((error, idx) => (
                      <li key={idx} className='error'>{error}</li>
                  ))}
              </ul>
              <Rating onClick={handleRating} ratingValue={rating} />
              <>
                  {showRatingErrors && ratingValidationErrors.map((error, idx) => (
                      <li key={idx} className='error'>{error}</li>
                  ))}
              </>
              <input
                  type={'textarea'}
                  value={content}
                  placeholder="Add comment......"
                  onChange={e => {setContent(e.target.value); setShowContentErrors(true)}}
              />
              <>
                  {showContentErrors && contentValidationErrors.map((error, idx) => (
                      <li key={idx} className='error'>{error}</li>
                  ))}
              </>
              <button type='submit'>POST</button>
              <button type='button' onClick={close}>Cancle</button>
          </form>
      </div>
  )
}
