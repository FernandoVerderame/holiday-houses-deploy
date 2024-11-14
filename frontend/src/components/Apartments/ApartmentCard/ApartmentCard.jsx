import apartmentCardStyle from './ApartmentCard.module.scss';
import { FaBed as Beds } from "react-icons/fa";
import { ImHome as Sqm } from "react-icons/im";
import { ImUser as Guests } from "react-icons/im";

const ApartmentCard = ({ title, cover, description, beds, sqm, guests }) => {

    return (
        <div className={apartmentCardStyle.apartmentCard}>

            <div className={apartmentCardStyle.thumb}>
                <img src={cover ? `http://${cover}` : "https://placehold.co/600x400"}
                    alt={title}
                    className={apartmentCardStyle.cover}
                />
            </div>

            <div className={apartmentCardStyle.bottom}>
                <h3>{title}</h3>

                <ul>
                    <li><Beds />{beds} Bed</li>
                    <li><Sqm />{sqm}m<sup>2</sup></li>
                    <li><Guests />{guests} Guests</li>
                </ul>

                <p className='text-truncate m-0'>{description}</p>
            </div>
        </div >
    );

};

export default ApartmentCard;