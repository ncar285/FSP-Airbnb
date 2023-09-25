import "./EditReviewModal.css"
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createReview, updateReview } from '../../store/reviewsReducer'
import { getCurrentUser } from '../../store/sessionsReducer'
import { useSelector } from 'react-redux'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {AiTwotoneEdit} from 'react-icons/ai'
import {GrFormView} from 'react-icons/gr'
import { deactivateERM, getERMParams, getERMState } from '../../store/uiReducer'

const EditReviewModal = () => {

    const active = useSelector(getERMState)
    const dispatch = useDispatch()
    const loggedInUser = useSelector(getCurrentUser)
    const [displayLoginMessage, setDisplayLoginMessage] = useState(false)
    const params = useSelector(getERMParams);
    const { review, setReview, listingId } = params;
    const [mode, setMode] = useState(review ? 'view' : 'create')

    // ! to prevent breaking since models changed
    const bookingId = 5
    useEffect(() => {
        
        if(params) {
          setMode(review ? 'view' : 'create');

          const initialReview = (review === undefined || Object.keys(review).length === 0) ? {
            author_id: loggedInUser ? loggedInUser.id : null,
            booking_id: bookingId,
            body: '',
            accuracy: null,
            cleanliness: null,
            communication: null,
            location: null, 
            value: null
          } : review;
          
          if(setReview) {
            setReview(initialReview);
          }
        }
    }, [active, loggedInUser]);


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

    const updateReviewField = (category, n) => {
        setReview({...review, [category]: n})
    }


    const changeableRadioButtons = ( category ) => {

        return (
            <>
                <div className='star-rating-selection'>
                    <div className='indv-star' 
                    onClick={()=>updateReviewField(category, 1)}>
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
                        {(mode === 'edit') &&
                        <GrFormView onClick={()=>{setMode('view')}}/>}
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