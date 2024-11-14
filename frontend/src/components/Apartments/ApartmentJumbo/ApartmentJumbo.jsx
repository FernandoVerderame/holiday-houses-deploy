import Navbar from '../../Navbar/Navbar';
import apartmentJumboStyle from './ApartmentJumbo.module.scss';

const ApartmentJumbo = ({ title, cover }) => {
    return (
        <>
            <section className={apartmentJumboStyle.jumbo}
                style={{
                    backgroundImage: cover
                        ? `url(http://${cover})`
                        : `url('./assets/images/jumbo.jpg')`
                }}
            >
                <div className="container-home">
                    <Navbar />

                    <h1>{title}</h1>
                </div>
            </section >
        </>
    );
};

export default ApartmentJumbo;