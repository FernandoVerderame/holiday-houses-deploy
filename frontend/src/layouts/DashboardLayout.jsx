import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar/Navbar.jsx";
import { FaHome as Apartments } from "react-icons/fa";
import { MdEmail as Messages } from "react-icons/md";
import { MdReviews as Reviews } from "react-icons/md"
import { FaImage as Images } from "react-icons/fa6";

const DashboardLayout = () => {
    return (
        <div className="dashboard-wrapper">
            <header>
                <Navbar />
            </header>
            <div className="bottom-content bg-gray d-flex">
                <div className="sidebar">
                    <ul className="list-group">
                        <li>
                            <NavLink
                                className={({ isActive }) => `nav-link text-white p-0 d-flex align-items-center gap-1 ${isActive ? 'fw-bold' : ''}`}
                                to={'/dashboard/apartments'}>
                                <Apartments />
                                <span className="d-none d-lg-block">Appartamenti</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `nav-link text-white p-0 d-flex align-items-center gap-1 ${isActive ? 'fw-bold' : ''}`}
                                to={'/dashboard/messages'}>
                                <Messages />
                                <span className="d-none d-lg-block">Messaggi</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `nav-link text-white p-0 d-flex align-items-center gap-1 ${isActive ? 'fw-bold' : ''}`}
                                to={'/dashboard/reviews'}>
                                <Reviews />
                                <span className="d-none d-lg-block">Recensioni</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => `nav-link text-white p-0 d-flex align-items-center gap-1 ${isActive ? 'fw-bold' : ''}`}
                                to={'/dashboard/images'}>
                                <Images />
                                <span className="d-none d-lg-block">Galleria</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div >
    );
}

export default DashboardLayout;