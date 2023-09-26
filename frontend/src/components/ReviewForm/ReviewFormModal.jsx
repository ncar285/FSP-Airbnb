import './ReviewFormModal.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createReview, updateReview } from '../../store/reviewsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useSelector } from 'react-redux'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {AiTwotoneEdit} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import { BsTrash3 } from "react-icons/bs"
import { activateDRM } from '../../store/uiReducer'

const ReviewFormModal = ({setOpenModal, setSuccessMessage}) => {


    const dispatch = useDispatch()
    const loggedInUser = useSelector(getCurrentUser)
    
    const [mode, setMode] = useState(null)
    const [displayLoginMessage, setDisplayLoginMessage] = useState(false)

    const [review, setReview] = useState()

    
    const handleTrashCanClick = async () => {
        setOpenModal(false)
        dispatch(activateDRM())
    }

    useEffect(()=>{
        const modalData = JSON.parse(sessionStorage.getItem("reviewModal"));
        setReview(modalData.review)
        setMode(modalData.mode)
    },[]) 

    const loginMessage =() => {
        return (
            <>
                <div>Please Log in first!</div>
            </>
        )
    }

    const showSuccessMessage = async () => {
        setSuccessMessage(true)
        setTimeout(()=>{
            setSuccessMessage(false)
        }, 1900)
    }


    const handleSubmitReview = async e => {
        e.preventDefault();
        if (loggedInUser && mode === 'create'){
            dispatch(createReview(review))
        } else if (loggedInUser && mode === 'edit'){
            dispatch(updateReview(review))
        } else {
            setDisplayLoginMessage(true)
        }
        setOpenModal(false)
        sessionStorage.removeItem("reviewModal");
        showSuccessMessage()
    }

    const reviewRadioButtons = ( initialCategory ) => {
        let category
        if (initialCategory === 'check_in') {
            category = 'checkIn';
        } else {
            category = initialCategory;
        }
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

    const viewReviewRadio = ( initialCategory ) => {
        let category
        if (initialCategory === 'check_in') {
            category = 'checkIn';
        } else {
            category = initialCategory;
        }
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

    const exitModal = () => {
        // initializeReview()
        sessionStorage.removeItem("reviewModal");
        setOpenModal(false)
    }

    


    return (
        <div className='basic-modal-background' onClick={exitModal}> 
            <div className='review-modal basic-modal'
            onClick={(e)=>e.stopPropagation()}>
                <form onSubmit={handleSubmitReview}>
                    
                    <div className='header-1'>
                        {getHeaderText(mode)}
                        {(mode === 'view') && 
                        <>
                        <div className='edit-delete-buttons'>
                            <AiTwotoneEdit onClick={()=>{setMode('edit')}}/> 
                            <BsTrash3 className="trash-button" onClick={handleTrashCanClick}/>
                        </div>
                        </>
                        }
                        {(mode === 'edit') && 
                        <>
                            <AiFillEye onClick={()=>{setMode('view')}}/>
                        {/* <BsTrash3 onClick={handleTrashCanClick}/> */}
                        </>
                         }
                    </div>

                    <div className='score-inputs'>
                        
                        <div className='left-review-categories'>
                            <div className='cleanliness input'>
                                <div className='category'>Cleanliness</div>
                                {(mode === 'create' || mode === 'edit') &&
                                reviewRadioButtons('cleanliness')}
                                {(mode === 'view') &&
                                viewReviewRadio('cleanliness')}
                            </div>
                            <div className='communication input'>
                                <div className='category'>Communication</div>
                                {(mode === 'create' || mode === 'edit') &&
                                reviewRadioButtons('communication')}
                                {(mode === 'view') &&
                                viewReviewRadio('communication')}
                            </div>
                            <div className='checkIn input'>
                                <div className='category'>Check-in</div>
                                {(mode === 'create' || mode === 'edit') &&
                                reviewRadioButtons('check_in')}
                                {(mode === 'view') &&
                                viewReviewRadio('check_in')}
                            </div>
                        </div>

                        <div className="right-review-categories">
                            <div className='accuracy input'>
                                <div className='category'>Accuracy</div>
                                {(mode === 'create' || mode === 'edit') &&
                                reviewRadioButtons('accuracy')}
                                {(mode === 'view') &&
                                viewReviewRadio('accuracy')}
                            </div>
                            <div className='location input'>
                                <div className='category'>Location</div>
                                {(mode === 'create' || mode === 'edit') &&
                                reviewRadioButtons('location')}
                                {(mode === 'view') &&
                                viewReviewRadio('location')}
                            </div>
                            <div className='value input'>
                                <div className='category'>Value</div>
                                {(mode === 'create' || mode === 'edit') &&
                                reviewRadioButtons('value')}
                                {(mode === 'view') &&
                                viewReviewRadio('value')}
                            </div>


                        </div>

                    </div>

                    <div>

                        {(mode === 'create' || mode === 'edit') &&
                            <textarea name="body" id="body" cols="30" rows="10" 
                                // value = { (mode === 'create') ? '' : review.body}
                                value = {review.body}
                                placeholder= { (mode !== 'create') ? '' : "leave your review here" }
                                onChange={e => setReview({ ...review, body: e.target.value })}
                                >
                            </textarea>
                        }
                            
                        {(mode === 'view') &&
                            <p className='view-old-review'>{`${review.body}`}</p>
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

export default ReviewFormModal