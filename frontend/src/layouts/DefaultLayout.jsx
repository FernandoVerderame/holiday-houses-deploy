import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const DefaultLayout = () => {
    return (
        <div className="wrapper">
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;