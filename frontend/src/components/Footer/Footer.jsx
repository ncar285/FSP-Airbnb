import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/sessionsReducer'
import { AiOutlineCopyrightCircle } from "react-icons/ai"
// import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { FaGithubSquare } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { BsCurrencyDollar } from 'react-icons/bs'
import './Footer.css'

const Footer = ({type = "default"}) => {

    const user = useSelector(getCurrentUser)

    if (type === "default"){
        type = !!user ? "small" : "large"
    }


        return (
            <div className={ (type === "small") ? 'small-footer-parent' : 'large-footer-parent'}>
                <div className='inner-footer'>
                    <div className='copywright'>
                        <div><AiOutlineCopyrightCircle/></div>
                        <div>{`${new Date().getFullYear()} Fairbnb, Inc.`}</div>
                        <div>&middot;</div>
                        <div>Nico Carlier's Airbnb Clone</div>
                    </div>
                    <div className='my-links'>
                        <div>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/ncar285/">
                                <FaGithubSquare/>
                            </a>
                        </div>
                        <div>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nicholas-carlier-ba8473193">
                                <FaLinkedin/>
                            </a>
                        </div>
                    </div>
                    <div className='currency'>
                        <div><BsCurrencyDollar/></div>
                        <div className='currency-label'>USD</div>
                    </div>
                </div>
    
            </div>
        )

    

}

export default Footer