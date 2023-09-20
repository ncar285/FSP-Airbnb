import "./EditReviewModal.css"
// import { deactivateERM } from "../../store/uiReducer";
// import { useDispatch, useSelector } from "react-redux"
// // import ReviewItem from "../ShowListing/Reviews/ReviewItem";
// import { getUserReview } from "../../store/reviewsReducer";
// import { getERMState } from "../../store/uiReducer";
// import ReviewForm from "../ReviewForm/ReviewForm";
// import { updateReview } from "../../store/reviewsReducer";
// import { useEffect, useState } from "react";

import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createReview, updateReview } from '../../store/reviewsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useSelector } from 'react-redux'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {AiTwotoneEdit} from 'react-icons/ai'
import { deactivateERM, getERMParams, getERMState } from '../../store/uiReducer'

const EditReviewModal = () => {

    // const myReview = useSelector(getUserReview)
    // const [review, setReview] = useState(myReview)
    // const active = useSelector(getERMState)
    // const dispatch = useDispatch()

    
    
    
    // useEffect(()=>{
    //     if (myReview){
    //         setReview(myReview)
    //     }
    // }, [myReview])

    // if (!active) return null
    
    
    // const handleExit = e => {
    //     e.stopPropagation()
    //     dispatch(deactivateERM())
    // }

    

    // const handleEdit = async e => {
    //     // e.preventDefault();
    //     e.stopPropagation()
    //     const newReview = {
    //         id: review.id,
    //         listing_id: review.listingId,
    //         author_id: review.authorId,
    //         body: review.body,
    //         cleanliness: review.cleanliness,
    //         communication: review.communication,
    //         check_in: review.checkIn,
    //         accuracy: review.accuracy,
    //         location: review.location,
    //         value: review.value
    //     }
    //     dispatch(updateReview(newReview))
    //     dispatch(deactivateERM())
    // }



    // return (
    //     <div className="ERM-container">
    //     <div className="ERM-background" onClick={handleExit}></div>
    //         <div className="ERM">
    //             <div className="ERM-header">
    //                 <div className="ERM-title-box"> 
    //                     <h2 className="ERM-title">
    //                         Edit your review
    //                     </h2>
    //                 </div>
    //             </div>
    //             <div className="ERM-options">
    //                 <button 
    //                 onClick={handleEdit}
    //                 >Save</button>
    //             </div>
    //             <ReviewForm key={review.id} review={review} setReview={setReview} editMode={true}/> 
    //         </div>
    //     </div>
    // )

    const active = useSelector(getERMState)
    const {review, setReview, listingId} = useSelector(getERMParams)
    const dispatch = useDispatch()
    const loggedInUser = useSelector(getCurrentUser)
    const [displayLoginMessage, setDisplayLoginMessage] = useState(false)


    // const findMode = review ? 'view' : 'create'
    const findMode = () => {
        // debugger
        return review ? 'view' : 'create'
    }
    const [mode, setMode] = useState(findMode())

    useEffect(()=>{
        if (review === null && mode === 'create'){
            setReview({
                author_id: loggedInUser.id,
                listing_id: listingId,
                body: '',
                accuracy: null,
                cleanliness: null,
                communication: null,
                location: null, 
                value: null
            })
    
        }
    }, review, mode)


    console.log(review)
    console.log(mode)
    console.log(review === null && mode === 'create')

    useEffect(()=>{
        if (loggedInUser){
            setDisplayLoginMessage(false)
        }
    },[loggedInUser]) 

    if (!active) return null

    const loginMessage =() => {
        return (
            <>
                <div>Please Log in first!</div>
            </>
        )
    }

    const handleSubmitReview = async e => {
        e.preventDefault();
        if (loggedInUser && mode === 'create'){
            const res = await dispatch(createReview(review))
            if (res.ok){
                dispatch(deactivateERM())
            }
        } else if (loggedInUser && mode === 'edit'){
            const res = await dispatch(updateReview(review))
            if (res.ok){
                dispatch(deactivateERM())
            }
        } else {
            setDisplayLoginMessage(true)
        }
    }


    const changeableRadioButtons = ( category ) => {

        return (
            <>
                <div className='star-rating-selection'>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 1})}>
                        {(review && review[category] >= 1) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 2})}>
                        {(review && review[category] >= 2) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 3})}>
                        {(review && review[category] >= 3) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 4})}>
                        {(review && review[category] >= 4) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 5})}>
                        {(review && review[category] >= 5) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                </div>

            </>
        )
    }

    const viewReviewRadio = ( category ) => {
        return (
            <>
                <div className='star-rating-selection'>
                    <div className='indv-star' >
                        {(review[category] >= 1) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' >
                        {(review[category] >= 2) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' >
                        {(review[category] >= 3) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' >
                        {(review[category] >= 4) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' >
                        {(review[category] >= 5) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                </div>

            </>
        )
    }

    const getHeaderText = (mode) => {
        switch (mode) {
          case 'create':
            return 'Leave a review';
          case 'edit':
            return 'Edit your review';
          case 'view':
            return 'Your review';
          default:
            return '';
        }
    };

    


    return (
        <div className='basic-modal-background' onClick={()=>dispatch(deactivateERM())}> 
            <div className='review-modal basic-modal'
            onClick={(e)=>e.stopPropagation()}>
                <form onSubmit={handleSubmitReview}>
                    
                    <div className='header-1'>
                        {getHeaderText(mode)}
                        {(mode === 'view') && 
                        <AiTwotoneEdit onClick={()=>{setMode('edit')}}/> }
                    </div>

                    <div className='score-inputs'>
                        
                        <div className='left-review-categories'>
                            <div className='cleanliness input'>
                                <div className='category'>Cleanliness</div>
                                {(mode === 'create' || mode === 'edit') &&
                                changeableRadioButtons('cleanliness')}
                                {(mode === 'view') &&
                                viewReviewRadio('cleanliness')}
                            </div>
                            <div className='communication input'>
                                <div className='category'>Communication</div>
                                {(mode === 'create' || mode === 'edit') &&
                                changeableRadioButtons('communication')}
                                {(mode === 'view') &&
                                viewReviewRadio('communication')}
                            </div>
                            <div className='checkIn input'>
                                <div className='category'>Check-in</div>
                                {(mode === 'create' || mode === 'edit') &&
                                changeableRadioButtons('checkIn')}
                                {(mode === 'view') &&
                                viewReviewRadio('checkIn')}
                            </div>
                        </div>

                        <div className="right-review-categories">
                            <div className='accuracy input'>
                                <div className='category'>Accuracy</div>
                                {(mode === 'create' || mode === 'edit') &&
                                changeableRadioButtons('accuracy')}
                                {(mode === 'view') &&
                                viewReviewRadio('accuracy')}
                            </div>
                            <div className='location input'>
                                <div className='category'>Location</div>
                                {(mode === 'create' || mode === 'edit') &&
                                changeableRadioButtons('location')}
                                {(mode === 'view') &&
                                viewReviewRadio('location')}
                            </div>
                            <div className='value input'>
                                <div className='category'>Value</div>
                                {(mode === 'create' || mode === 'edit') &&
                                changeableRadioButtons('value')}
                                {(mode === 'view') &&
                                viewReviewRadio('value')}
                            </div>


                        </div>

                    </div>

                    <div>

                        {(mode === 'create' || mode === 'edit') &&
                            <textarea name="body" id="body" cols="30" rows="10" 
                                value = { (mode === 'create') ? null : review.body}
                                placeholder= { (mode !== 'create') ? null : "leave your review here" }
                                onChange={e => setReview({ ...review, body: e.target.value })}
                                >
                            </textarea>
                        }
                            
                        {(mode === 'view' && review) &&
                            <p className='view-old-review'>{`"${review.body}"`}</p>
                        }
                        
                    </div>


                    {(mode === 'create' || mode === 'edit') &&
                        <button type='submit'>Submit Review</button>
                    }


                </form>

                {displayLoginMessage && loginMessage()}
            </div>

        </div>

    )
        
}

export default EditReviewModal