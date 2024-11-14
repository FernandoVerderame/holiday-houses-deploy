import footerStyle from './Footer.module.scss';
import { FaFacebook as Facebook } from "react-icons/fa";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import logo from '../../assets/images/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

const Footer = () => {

    const location = useLocation(); // Ottieni la location corrente

    // Funzione per scrollare alla sezione "apartments" se sei sulla home
    const handleScrollToSection = () => {
        scroller.scrollTo('apartments', {
            smooth: true,
            duration: 500
        });
    };

    return (
        <>
            <footer>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <div className='d-flex gap-3 align-items-center mb-4'>
                                <img src={logo} alt="logo" className={footerStyle.logo} />
                                <h2 className='mb-0'>Holiday Houses</h2>
                            </div>

                            <p>Welcome to Holiday Houses! We offer high-quality apartments for every need. If you're looking for a place to feel at home, you've come to the right place. Book your stay today!</p>
                        </div>
                        <div className='col-4 d-flex flex-column align-items-center'>
                            <h3 className={`mb-4 ${footerStyle.links}`}>Links</h3>

                            <ul className='d-flex flex-column gap-2'>
                                <li className="nav-item">
                                    <NavLink
                                        className="link-underline-light text-white"
                                        to={'/'}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="link-underline-light text-white"
                                        to={'/about-us'}>About Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="link-underline-light text-white"
                                        to="/#apartments" // Naviga verso la home con l'anchor
                                        onClick={(e) => {
                                            if (location.pathname === '/') { // Se sei già sulla home
                                                e.preventDefault(); // Impedisci la navigazione
                                                handleScrollToSection(); // Esegui lo scroll
                                            }
                                        }}
                                    >
                                        Apartments
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="link-underline-light text-white"
                                        to={'/contact-us'}>Contact Us</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='col-4'>
                            <h3 className='mb-4'>Contact</h3>

                            <ul className='mb-4'>
                                <li className='mb-1'>Phone: <span className='ms-2'>+39 3407501645</span></li>
                                <li>Mail: <span className='ms-2'>fer.verderame@gmail.com</span></li>
                            </ul>

                            <ul className='d-flex gap-4'>
                                <li><a href="https://www.facebook.com/groups/privatecartour?locale=it_IT" className='text-white'><Facebook /></a></li>
                                <li><a href="https://www.linkedin.com/company/holiday-houses1/" className='text-white'><Linkedin /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;