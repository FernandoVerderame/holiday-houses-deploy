import { GrMapLocation as Address } from "react-icons/gr";
import { BsChatLeftText as Chat } from "react-icons/bs";
import { HiOutlineMailOpen as Mail } from "react-icons/hi";

const ContactUsInfo = () => {
    return (
        <>
            <div className="card-info">
                <div className="row g-5">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="icon">
                                <Address className="fs-1" />
                            </div>
                            <h5>Homestay Addresses</h5>
                            <p>Salerno - Italy</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="icon">
                                <Chat className="fs-1" />
                            </div>
                            <h5>Call Us Support</h5>
                            <p>+39 3407501645</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="icon">
                                <Mail className="fs-1" />
                            </div>
                            <h5>Our Email</h5>
                            <p>fer.verderame@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUsInfo;