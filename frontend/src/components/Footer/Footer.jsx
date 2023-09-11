import { AiOutlineCopyrightCircle } from "react-icons/ai"
import { FaGithubSquare } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { BsCurrencyDollar } from 'react-icons/bs'
import './Footer.css'

const Footer = ({ alwaysthere }) => {
    return (
        <div className={`footer-parent ${alwaysthere ? 'fixed' : ''}`}>
            <div className={`inner-footer ${alwaysthere ? 'fixed' : ''}`}>
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