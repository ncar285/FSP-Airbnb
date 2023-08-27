import { AiFillStar } from "react-icons/ai"
import {MdOutlineKeyboardArrowLeft as LeftArrow} from "react-icons/md"
import {MdOutlineKeyboardArrowRight as RightArrow} from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getListingRevews } from "../../store/reviewsReducer"

const ListingItem = ({ listing, key }) => {
    const photoCount = listing.photoUrls.length
    const listingImagesRef = useRef(null);
    const stringPrice = Math.floor(listing.price).toLocaleString()
    const [leftArrow, setLeftArrow] = useState(false)
    const [rightArrow, setRightArrow] = useState(true)
    const [currentPhoto, setCurrentPhoto] = useState(1)

    // const images = Array.from(listingImagesRef.current.querySelectorAll('.slide'));

    // console.log(currentPhoto)

    useEffect(()=>{
        if (currentPhoto === 1){
            setLeftArrow(false)
        } else if (currentPhoto === listing.photoUrls.length){
            setRightArrow(false)
        }
    },[currentPhoto])

    useEffect(()=>{
        if (currentPhoto > 1 && currentPhoto < listing.photoUrls.length){
            setLeftArrow(true)
            setRightArrow(true)
        }

    },[currentPhoto])

    useEffect(() => {
        const scrollLeft = listingImagesRef.current.scrollLeft;
        const clientWidth = listingImagesRef.current.clientWidth;
        const newCurrentPhoto = Math.floor(scrollLeft / clientWidth) + 1;
        setCurrentPhoto(newCurrentPhoto);
        },[]
    )

    const handleScroll = () => {
        const scrollLeft = listingImagesRef.current.scrollLeft;
        const clientWidth = listingImagesRef.current.clientWidth;
        const newCurrentPhoto = Math.floor(scrollLeft / clientWidth) + 1;
        setCurrentPhoto(newCurrentPhoto);
    };
      
    useEffect(() => {
        listingImagesRef.current.addEventListener('scroll', handleScroll);
        return () => {
            listingImagesRef.current.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const renderShow = e => {
        if (e.target.classList.contains('clickable')){
            return null;
        }else {
            return window.open(`/listing/${listing.id}`, '_blank');
        }
    }

    const handleLeftClick = e => {
        e.stopPropagation()
        // decrementArrows()
        if (listingImagesRef.current.scrollLeft > 0) {
                listingImagesRef.current.scrollBy({
                left: -listingImagesRef.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };
    
    const handleRightClick = e => {
        e.stopPropagation()
        // incrementArrows()
        if (listingImagesRef.current.scrollLeft < (listingImagesRef.current.scrollWidth - listingImagesRef.current.clientWidth)) {
            listingImagesRef.current.scrollBy({
            left: listingImagesRef.current.clientWidth,
            behavior: 'smooth',
        });
    }
    };

    const photoEles = () => {
        const photoEles = [];
        for(let i=0; i < photoCount; i++) {
            photoEles.push (
                <div className="loaded-image">
                    <img className="slide" src={listing.photoUrls[i]} alt="" data-index={i + 1} />
                </div>
            )
        } 
        return photoEles;
    }
    return (
        <li>
            <div onClick={renderShow} key={key} className="item">
                <div className="inner-item">
                    <div className="slideshow-container">
                        {leftArrow &&
                        <div className="left-arrow clickable" onClick={handleLeftClick}>
                            <LeftArrow className="arrow-icon"/>
                        </div>
                        }
                        <div className="listing-images" ref={listingImagesRef}>
                            {photoEles()}
                        </div>
                        {rightArrow &&
                            <div className="right-arrow clickable" onClick={handleRightClick}>
                            <RightArrow className="arrow-icon"/>
                        </div>
                        }
                        {/* <div>
                            <a className="prev" onclick="plusSlides(-1)">&#10094;</a>
                            <a className="next" onclick="plusSlides(1)">&#10095;</a>
                        </div> */}
                        <div className="current-photo-dots">
                            <span className="dot" onclick="currentSlide(1)"></span>
                            <span className="dot" onclick="currentSlide(2)"></span>
                            <span className="dot" onclick="currentSlide(3)"></span>
                        </div>
                    </div>

                    <div className="loaded-text">
                        <div className="b1-loaded">
                            <div className="left-loaded">
                                <div className="text-item">
                                    {/* {listing.title} */}
                                    <p className="line-one">{`${listing.city}, ${listing.state}`}</p>
                                </div>
                                <div className="text-item">
                                    <p className="line-two">{listing.tagLine}</p>
                                </div>
                                <div className="text-item">
                                    <p className="next-dates">Oct 15-22</p>
                                </div>
                            </div>
                            <div className='text-item right-loaded'>
                                <div className="rating">
                                    <AiFillStar className="item-star"/>
                                    <p>{listing.totalRating}</p>
                                </div>
                            </div>
                        </div>
                        <div className="b2-loaded">
                            <div className="text-item price">
                                <p className="nominal-price">${stringPrice}</p>
                                <p className="night">night</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </li>
    );
}

export default ListingItem