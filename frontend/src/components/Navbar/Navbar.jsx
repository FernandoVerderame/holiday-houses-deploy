import { NavLink, useLocation } from "react-router-dom";
import { scroller } from 'react-scroll'; // Importa scroller da react-scroll
import { useAuth } from "../../contexts/AuthContext";
import logo from '../../assets/images/logo.png';
import navbarStyle from './Navbar.module.scss';

const Navbar = () => {

    const { isLoggedIn, logout, user } = useAuth();
    const location = useLocation(); // Ottieni la location corrente

    // Funzione per scrollare alla sezione "apartments" se sei sulla home
    const handleScrollToSection = () => {
        scroller.scrollTo('apartments', {
            smooth: true,
            duration: 500
        });
    };

    // Verifica se la pagina corrente è una pagina di dettaglio dell'appartamento
    const isApartmentDetailPage = location.pathname.includes('/apartments/');
    // Verifica se siamo sulla home
    const isHomePage = location.pathname === '/';

    return (
        <header>
            <nav className="navbar navbar-expand-lg px-5">
                <div className="container-fluid">
                    <div className="left-nav w-lg-25">
                        <NavLink className="navbar-brand text-white d-flex align-items-center" to={'/'}>
                            <img src={logo} alt="logo" className={navbarStyle.logo} />
                        </NavLink>
                    </div>
                    <div className="center-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 d-flex flex-row">
                            {/* Home link */}
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link text-white p-0 ${isActive && isHomePage ? navbarStyle.active : ''}`}
                                    to={'/'}>Home</NavLink>
                            </li>
                            {/* About Us link */}
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link text-white p-0 ${isActive ? navbarStyle.active : ''}`}
                                    to={'/about-us'}>About Us</NavLink>
                            </li>
                            {/* Apartments link */}
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link text-white p-0 ${isApartmentDetailPage ? navbarStyle.active : ''}`}
                                    to="/#apartments" // Naviga verso la home con l'anchor
                                    onClick={(e) => {
                                        if (isHomePage) { // Se sei già sulla home
                                            e.preventDefault(); // Impedisci la navigazione
                                            handleScrollToSection(); // Esegui lo scroll
                                        }
                                    }}
                                >
                                    Apartments
                                </NavLink>
                            </li>
                            {/* Contact Us link */}
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link text-white p-0 ${isActive ? navbarStyle.active : ''}`}
                                    to={'/contact-us'}>Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="right-nav w-lg-25 d-flex justify-content-end d-none d-lg-block">
                        {!isLoggedIn &&
                            <div className="d-flex gap-2">
                                <NavLink to={'/login'} className={`${navbarStyle.login} button`}>Login</NavLink>
                            </div>
                        }
                        {isLoggedIn &&
                            <div className="d-flex align-items-center gap-2">
                                <h3 className="m-0 fs-5">{user.name}</h3>
                                <button onClick={logout} className="btn btn-secondary">Logout</button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;