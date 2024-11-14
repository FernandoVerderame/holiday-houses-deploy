import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import logo from '../../../assets/images/logo.png';
import navbarStyle from './Navbar.module.scss';

const Navbar = () => {

    const { logout, user } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-lg px-5">
                <div className="container-fluid">
                    <div className="left-nav w-25">
                        <NavLink className="navbar-brand text-white d-flex align-items-center" to={'/'}>
                            <img src={logo} alt="logo" className={navbarStyle.logo} />
                        </NavLink>
                    </div>
                    <div className="center-nav m-0 fs-5">
                        DASHBOARD
                    </div>
                    <div className="right-nav w-25 d-flex justify-content-end">
                        <div className="d-flex align-items-center gap-3">
                            <h3 className="m-0 fs-5">{user.name}</h3>
                            <button onClick={logout} className={`button btn-secondary ${navbarStyle.logout}`}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    );
}

export default Navbar;