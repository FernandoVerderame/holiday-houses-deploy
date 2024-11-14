import Navbar from "../components/Navbar/Navbar.jsx";
import { NavLink, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import ApartmentList from "../components/Apartments/ApartmentList/ApartmentList.jsx";
import ChooseUs from "../components/ChooseUs/ChooseUs.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";

const Home = () => {

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

            {/* Jumbotron */}
            <section id="jumbotron">
                <div className="container-home">
                    <Navbar />

                    <div className="sec-title">
                        <h1 className="home-title">Welcome <i>to</i> Holiday Houses.</h1>
                        <p>Chilling out on the bed in your guest house watching television, while wearing your own pajamas, <br className="d-md-block" /> is sometimes the best part of a vacation.</p>

                        <div className="d-flex gap-3">
                            <div className="button about" role="button">About Us</div>
                            <NavLink
                                className="button apartments"
                                to="/#apartments" // Naviga verso la home con l'anchor
                                onClick={(e) => {
                                    if (location.pathname === '/') { // Se sei già sulla home
                                        e.preventDefault(); // Impedisci la navigazione
                                        handleScrollToSection(); // Esegui lo scroll
                                    }
                                }}
                            >See Apartments
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            {/* Perchè scegliere noi */}
            <ChooseUs />

            {/* Sezione appartamenti */}
            <ApartmentList />

            {/* Sezione recensioni */}
            <Reviews />
        </>
    );
}

export default Home;