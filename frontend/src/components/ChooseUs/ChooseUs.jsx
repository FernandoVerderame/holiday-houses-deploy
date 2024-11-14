import { PiPanorama as Panorama } from "react-icons/pi";
import { IoDiamondOutline as Diamond } from "react-icons/io5";
import { GiReceiveMoney as Investment } from "react-icons/gi";

const ChooseUs = () => {
    return (
        <>
            <section id="choose-us" >
                <div className="container">
                    <h2>Why Choose Us</h2>
                    <h4>Why should you choose our apartment?</h4>

                    <div className="row g-5">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="icon">
                                    <Panorama className="fs-1" />
                                </div>
                                <h5>Vision Panorama</h5>
                                <p>Enjoy breathtaking views of the city skyline from every room in our luxury apartments. With expansive windows and an elevated position, you’ll have the perfect vantage point to appreciate the beauty of the surrounding landscape, whether day or night. Whether you’re looking to unwind or entertain, the panoramic views provide a stunning backdrop for every occasion.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="icon">
                                    <Diamond className="fs-1" />
                                </div>
                                <h5>5 Star Standard Living</h5>
                                <p>Our apartments offer the finest in modern living, with high-end finishes, spacious interiors, and a comprehensive set of amenities. From the stylish living areas to the fully equipped kitchens and luxurious bathrooms, every detail is crafted to meet the highest standards. The property is designed for comfort and convenience, ensuring a 5-star living experience that exceeds expectations.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="icon">
                                    <Investment className="fs-1" />
                                </div>
                                <h5>Resonable Investment Rate</h5>
                                <p>With competitive pricing in a prime location, our apartments provide excellent value for money. Offering both high quality and long-term potential, they are an ideal choice for both personal living and investment. The property’s proximity to key city landmarks, transport links, and amenities ensures strong rental demand and future capital growth, making it a smart financial decision.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ChooseUs;