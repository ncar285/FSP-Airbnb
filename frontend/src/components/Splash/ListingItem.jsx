// import { useDispatch, useSelector } from 'react-redux'
// import { fetchListing, fetchListing } from '../../store/listingsReducer'
// import { useState } from 'react'
import { AiFillStar } from "react-icons/ai"
// import './ListingItem.css'

const ListingItem = ({ listing, key }) => {

    // const dispatch = useDispatch()

    return (
        <li>
            <div key={key} className="item">
                <div className="inner-item">
                    <div className="loaded-image">
                        <img src={listing.photoUrls[0]} alt="" />
                    </div>
                    <div className="loaded-text">
                        <div className="b1-loaded">
                            <div className="left-loaded">
                                <div className="text-item">
                                    <p className="line-one">South Lake Tahoe, California</p>
                                </div>
                                <div className="text-item">
                                    <p className="line-two">Lake Tahoe</p>
                                </div>
                                <div className="text-item">
                                    <p className="next-dates">Oct 15-22</p>
                                </div>
                            </div>
                            <div className='text-item right-loaded'>
                                <div className="rating">
                                    <AiFillStar class="item-star"/>
                                    <p>5.0</p>
                                </div>
                            </div>
                        </div>
                        <div className="b2-loaded">
                            <div className="text-item price">
                                <p>$615 /</p>
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