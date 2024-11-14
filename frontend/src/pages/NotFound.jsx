import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <section id="not-found">
                <h1><span>Oops!</span><br />Page not found</h1>
                <p>The page you are looking is not available or has been removed. Try going<br />to Home Page by using the button below.</p>
                <NavLink
                    to={'/'}
                    className="button"
                >Back to homepage</NavLink>
            </section>
        </>
    );
};

export default NotFound;