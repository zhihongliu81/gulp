import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
// import { Rating } from 'react-simple-star-rating';
import { createReviewThunk, updateReviewThunk } from '../../store/review';
// import { startTransition } from 'react';
import './reviewForm.css';
import ratingStarFilled from '../../images/rating-star-filled-1.png'
import ratingStarEmpty from '../../images/rating-star-empty-1.png'

export default function ReviewForm({close,businessId, business, reviewId, action, review}) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(action === 'create'? 0 :(review.rating)); // initial rating value
    const [content, setContent] = useState(action === 'create' ? '' : review.content);
    const [errors, setErrors] = useState([]);

    const [ratingValidationErrors, setRatingValidationErrors] = useState([]);
    const [contentValidationErrors, setContentValidationErrors] = useState([]);

    const [showRatingErrors, setShowRatingErrors] = useState(false);
    const [showContentErrors, setShowContentErrors] = useState(false);

    // useEffect(() => {
    //     setErrors([]);
    //     const errors =[];
    //     if (rating.length === 0) errors.push("Rating is required");
    //     setRatingValidationErrors(errors);
    // }, [rating])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (content.length === 0) errors.push("Content is required");
        if (content.length > 2000) errors.push("Content must be 2000 characters or less")
        setContentValidationErrors(errors);
    }, [content])

    // Catch Rating value
    const head = action === 'create' ? <h2>Write a Review of {business.name}</h2>: <h2>Update a Review of {business.name}</h2>;
    // const handleRating = (rate) => {
    //     const newRate = rate / 20
    //     setRating(newRate)
    //     setShowRatingErrors(true)
    // }

    // const handleRating = (rating) => {
    //     setRating(rating)
    // }

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
      <div className='review-form-container'>
          {head}
          <form className='review-form' onSubmit={handleSubmit}>
              <ul>
                  {errors.map((error, idx) => (
                      <li key={idx} className='error'>{error}</li>
                  ))}
              </ul>
              {/* <Rating onClick={handleRating} ratingValue={rating * 20} /> */}
              <div className='review-form-rating-container'>
                  {[1, 2, 3, 4, 5].map(ele => {
                      return (
                          <div key={ele} onClick={() => setRating(ele)}>
                              {rating >= ele ? <img className='review-form-rating-image' alt='' src={ratingStarFilled} /> : <img className='review-form-rating-image' alt='' src={ratingStarEmpty} />}
                          </div>

                      )
                  })}

              </div>
              <>
                  {showRatingErrors && ratingValidationErrors.map((error, idx) => (
                      <li key={idx} className='error'>{error}</li>
                  ))}
              </>
              <textarea
                  value={content}
                  placeholder="Add comment......2000 characters or less"
                  rows='5'
                  cols='50'
                  onChange={e => { setContent(e.target.value); setShowContentErrors(true) }}
              />
              <>
                  {showContentErrors && contentValidationErrors.map((error, idx) => (
                      <li key={idx} className='error'>{error}</li>
                  ))}
              </>
              <div>
                  <button type='submit'>POST</button>
                  <button type='button' onClick={close}>Cancle</button>
              </div>
          </form>
      </div>
  )
}
