import {BsFillGrid3X3GapFill} from 'react-icons/bs'
import './PhotoAlbum.css'
import { useState } from 'react'
import SlideShow from '../SlideShow/SlideShow'

const PhotoAlbum = ({ listing }) => {

    const [slideShowOpen, setSlideShowOpen] = useState(false)

    return (

        <>

        { slideShowOpen && 
            <SlideShow photos={listing.photoUrls} 
            setSlideShowOpen={setSlideShowOpen}
            />
        }
        
        <div className="photo-album">
            <div className='LHS-show'>
                <img className='main-show-image' src={listing.photoUrls[0]}  alt="" />
            </div>
            <div className='RHS-show'>
                <div className='RHS-upper'>
                    <div className='album-1 RHS-img'>
                        <img className='RHS-image-1' src={listing.photoUrls[1]} alt="" />
                    </div>
                    <div className='album-2 RHS-img'> 
                        <img src={listing.photoUrls[2]}  alt="" />
                    </div>
                </div>
                <div className='RHS-lower'>
                    <div className='album-3 RHS-img'> 
                        <img src={listing.photoUrls[3]}  alt="" />
                    </div>
                    <div className='album-4 RHS-img'>
                        <img src={listing.photoUrls[4]}  alt="" />
                    </div>
                </div>
            </div>

            <div className='slideshow-button'
            onClick = {() => setSlideShowOpen(true)}
            >
                <BsFillGrid3X3GapFill id='slideshow-icon'/>
                <p>Show all photos</p>
            </div>

        </div>

        </>
    )
}

export default PhotoAlbum