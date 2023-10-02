import './SlideShow.css'
import { useState } from "react"
import {RxCross2} from 'react-icons/rx'
import {AiOutlineLeft} from 'react-icons/ai'
import {AiOutlineRight} from 'react-icons/ai'

const SlideShow = ({photos, setSlideShowOpen, slidePhoto}) => {

    const initial = slidePhoto ? slidePhoto + 1 : 1
    const [photoIndex, setPhotoIndex] = useState(initial)

    return (
        <div className='fullscreen-slideshow-container'>
            <div className='fixed-subcontainer'>

                <div className='close-slideshow'
                onClick = {() => setSlideShowOpen(false)}
                >
                    <RxCross2 id='cross-icon-slideshow'/>
                    <p> Close</p>
                </div>

                <p id="slideshow-index">{photoIndex} / {photos.length}</p>

                <div className='slideshow-image-container'>
                    <img src={photos[photoIndex - 1]}  alt="" />
                </div>

                { photoIndex !== 1 &&
                    <div className='slideshow-arrow left'
                    onClick={()=>{setPhotoIndex(ind => ind - 1)}}
                    >
                        <AiOutlineLeft/>
                    </div>
                }

                { photoIndex !== photos.length &&
                    <div className='slideshow-arrow right'
                    onClick={()=>{setPhotoIndex(ind => ind + 1)}}>
                        <AiOutlineRight/>
                    </div>
                }

            </div>

        </div>
    )

    
}

export default SlideShow