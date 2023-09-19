import './ReviewFormModal.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createReview } from '../../store/reviewsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useSelector } from 'react-redux'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {AiTwotoneEdit} from 'react-icons/ai'

const ReviewFormModal = ({review, setReview}) => {

    
    const findMode = review ? 'view' : 'create'
    const [mode, setMode] = useState(findMode)

    // setMode(review ? 'view' : 'create')

    // console.log(review)
    // console.log(mode)


    const dispatch = useDispatch()
    const loggedInUser = useSelector(getCurrentUser)
    const [displayLoginMessage, setDisplayLoginMessage] = useState(false)

    useEffect(()=>{
        if (loggedInUser){
            setDisplayLoginMessage(false)
        }
    },[loggedInUser]) 

    const loginMessage =() => {
        return (
            <>
                <div>Please Log in first!</div>
            </>
        )
    }

    const handleSubmitReview = async e => {
        e.preventDefault();
        if (loggedInUser){
            dispatch(createReview(review))
        } else {
            setDisplayLoginMessage(true)
        }
    }


    const reviewRadioButtons = ( category ) => {
        return (
            <>
                <div className='star-rating-selection'>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 1})}>
                        {(review[category] >= 1) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 2})}>
                        {(review[category] >= 2) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 3})}>
                        {(review[category] >= 3) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 4})}>
                        {(review[category] >= 4) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
                    </div>
                    <div className='indv-star' onClick={()=>setReview({...review, [category]: 5})}>
                        {(review[category] >= 5) ? <AiFillStar className='filled'/> : <AiOutlineStar className='outline'/>}
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
        <div className='basic-modal-background' onClick={()=>setReview(null)}> 
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
                                reviewRadioButtons('checkIn')}
                                {(mode === 'view') &&
                                viewReviewRadio('checkIn')}
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
                                value = { (mode === 'create') ? null : review.body}
                                placeholder= { (mode !== 'create') ? null : "leave your review here" }
                                onChange={e => setReview({ ...review, body: e.target.value })}
                                >
                            </textarea>
                        }
                            
                        {(mode === 'view') &&
                            <p>{`"${review.body}"`}</p>
                        }


                        
                    </div>

                  


                    {(mode === 'create' || mode === 'edit') &&
                        <button>Submit Review</button>
                    }
                        
                    {/* {(mode === 'view') &&
                        <p>{`"${review.body}"`}</p>
                    } */}


                </form>

                {displayLoginMessage && loginMessage()}

                
                        

            </div>

        </div>

    )
}

export default ReviewFormModal