import './ReviewItem.css'
import { getCurrentUser } from "../../store/sessionsReducer";
import { useSelector } from "react-redux";
// import { BsTrash3 } from "react-icons/bs"
// import { FaEdit } from "react-icons/fa"
// import { activateERM } from '../../store/uiReducer';
// import { activateDRM } from '../../store/uiReducer';
import { useDispatch } from 'react-redux';
import {MdKeyboardArrowRight} from 'react-icons/md'
import {MdKeyboardArrowUp} from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';

const ReviewItem = ({ review, editMode = true }) => {
    const author = review.authorFirstname;
    const dateObject = new Date(review.createdAt);
    const date = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(dateObject);
    const imgUrl = review.authorPhotoUrl
    const user = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    
    
    const [showMore, setShowMore] = useState(false)
    const [fullSize, setFullSize] = useState(false)

    const myReview = (user && user.id === review.authorId)
    
    const reviewBodyRef = useRef(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const reviewBody = reviewBodyRef.current;
            if (reviewBody) {
                const lineHeight = parseFloat(window.getComputedStyle(reviewBody).lineHeight);
                const lines = Math.floor(reviewBody.scrollHeight / lineHeight);
                setShowMore(lines > 3);
            }
        }, 0);
    }, [review, windowWidth]);


    return (
        <>
            <div className='review-item'>
                {/* {`review-item ${myReview ? 'my-review' : ''}`}> */}
                <div className='user-review-options'>
                    <div className='review-header'>
                        <img className="author-profile" src={imgUrl} alt="" />
                        <div className='name-date'>
                            <div className='reviewer-name'>{author}</div>
                            <div className='review-date'>{date}</div>
                        </div>
                    </div>
                </div>

                <div className='rev-body'>
                <p ref={reviewBodyRef} 
                className = {`rev-description-preview ${fullSize ? 'fullsize' : ''}`  }>
                {review.body}</p>
                    { showMore && !fullSize &&
                    <div onClick={()=>setFullSize(true)} className={`show-more ${fullSize ? 'fullsize' : ''}`  } >
                        Show More <MdKeyboardArrowRight 
                         className='arrow-more'/>
                    </div>
                    }
                    { fullSize &&
                    <div onClick={()=>setFullSize(false)} className={`show-more ${fullSize ? 'fullsize' : ''}`  } >
                        Show Less <MdKeyboardArrowUp 
                         className='arrow-more'/>
                    </div>
                    }
                </div>
             </div>
        </>
    )
}

export default ReviewItem