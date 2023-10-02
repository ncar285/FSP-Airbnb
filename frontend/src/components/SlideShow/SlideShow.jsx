import './SlideShow.css'
import { useState } from "react"
import {RxCross2} from 'react-icons/rx'
import {AiOutlineLeft} from 'react-icons/ai'
import {AiOutlineRight} from 'react-icons/ai'

const SlideShow = ({photos, setSlideShowOpen}) => {

    const [photoIndex, setPhotoIndex] = useState(1)

    return (
        <div className='slideshow-container'>
            <div className='fixed-subcontainer'>

                

                    <div className='close-slideshow'
                    onClick = {() => setSlideShowOpen(false)}
                    >
                        <RxCross2 id='cross-icon-slideshow'/>
                        <p> Close</p>
                    </div>

                    <p id="slideshow-index">{photoIndex} / {photos.length}</p>
                    {/* <p id="slideshow-index">hellow</p> */}

                    <div className='slideshow-image-container'>
                        <img src={photos[photoIndex]}  alt="" />
                    </div>

                    <div className='slideshow-arrow left'>
                        <AiOutlineLeft/>
                    </div>

                    <div className='slideshow-arrow right'>
                        <AiOutlineRight/>
                    </div>

                

        



            </div>


        </div>
    )

    
}

export default SlideShow