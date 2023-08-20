import { AiFillStar } from "react-icons/ai"
import {MdOutlineKeyboardArrowLeft as LeftArrow} from "react-icons/md"
import {MdOutlineKeyboardArrowRight as RightArrow} from "react-icons/md"
import { useRef } from "react"

const ListingItem = ({ listing, key }) => {
    const photoCount = listing.photoUrls.length
    const listingImagesRef = useRef(null);
    
    const renderShow = e => {
        if (e.target.classList.contains('clickable')){
            return null;
        }else {
            return window.open(`/listing/${listing.id}`, '_blank');
        }
    }

    const handleLeftClick = e => {
        e.stopPropagation()
        if (listingImagesRef.current.scrollLeft > 0) {
                listingImagesRef.current.scrollBy({
                left: -listingImagesRef.current.clientWidth,
                behavior: 'smooth',
            });
        }
    };
    
    const handleRightClick = e => {
        e.stopPropagation()
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
                    <img className="slide" src={listing.photoUrls[i]} alt="" />
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
                        <div className="left-arrow clickable" onClick={handleLeftClick}>
                            <LeftArrow className="arrow-icon"/>
                        </div>
                        <div className="listing-images" ref={listingImagesRef}>
                            {photoEles()}
                        </div>
                        <div className="right-arrow clickable" onClick={handleRightClick}>
                            <RightArrow className="arrow-icon"/>
                        </div>
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
                                    <p className="line-one">{`${listing.city} ${listing.state}`}</p>
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
                                    <p>5.0</p>
                                </div>
                            </div>
                        </div>
                        <div className="b2-loaded">
                            <div className="text-item price">
                                <p>{`${Math.floor(listing.price)} `}</p>
                                <p>night</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </li>
    );
}

export default ListingItem