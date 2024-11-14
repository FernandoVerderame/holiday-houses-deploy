import apartmentInfoStyle from './ApartmentInfo.module.scss';
import mastercard from '../../../assets/images/mastercard.png';
import visa from '../../../assets/images/visa.png';
import paypal from '../../../assets/images/paypal.png';

const ApartmentAdditionalInfo = () => {
    return (
        <>
            <div className='row'>
                {/* Check In */}
                <div className='col-3 fw-semibold text-black'>Check-In:</div>
                <div className='col-9 mb-4'>6:00 - 23:00</div>

                {/* Check Out */}
                <div className='col-3 fw-semibold text-black'>Check-Out:</div>
                <div className='col-9 mb-4'>6:00 - 23:00</div>

                {/* Calcellazione / Pagamento */}
                <div className='col-3 fw-semibold text-black'>Cancellation:</div>
                <div className='col-9 mb-4'>Cancellation and prepayment policies vary according to guest house type. Please enter the dates of your stay and check the conditions of your required house.</div>

                {/* Bambini ed letti extra */}
                <div className='col-3 fw-semibold text-black'>Children and extra beds :</div>
                <div className='col-9 mb-4'>All children are welcome. One child under 6 years is charged EUR 50 per night when using existing beds. There is no capacity for extra beds in the room. Supplements are not calculated automatically in the total costs and will have to be paid for separately during your stay.</div>

                {/* Animali domestici */}
                <div className='col-3 fw-semibold text-black'>Pets:</div>
                <div className='col-9 mb-4'>Pets are allowed.</div>

                {/* Info aggiuntive */}
                <div className='col-3 fw-semibold text-black'>Additional info:</div>
                <div className='col-9 mb-4'>Our guest house offers a range of services designed to ensure a comfortable and worry-free stay. Payment for the stay is required at check-in and can be made in cash, by credit card, or via bank transfer. We provide free high-speed Wi-Fi throughout the rooms and common areas, allowing guests to stay connected at all times.

                    Rooms are cleaned daily, with linens and towels changed every three days or upon request to meet guests' needs. The property is accessible to guests with reduced mobility, featuring an elevator and dedicated entrances, and our staff is pleased to provide any specific assistance required.

                    For guests arriving by car, private parking is available with an advance reservation. Additionally, we can arrange convenient airport transfers upon request. Our guests can also enjoy access to a wellness area and a variety of outdoor activities, all bookable on-site, for a stay filled with relaxation and discovery.
                </div>

                {/* Opzioni di pagamento */}
                <div className='col-3 fw-semibold text-black pt-3'>Payment options :</div>
                <div className='col-9'>
                    <ul className={apartmentInfoStyle.payment}>
                        <li><img src={visa} alt="Visa" /></li>
                        <li><img src={mastercard} alt="Mastercard" className={apartmentInfoStyle.mastercard} /></li>
                        <li><img src={paypal} alt="PayPal" className={apartmentInfoStyle.paypal} /></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ApartmentAdditionalInfo;