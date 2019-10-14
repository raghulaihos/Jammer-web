import React from 'react';
import './Confirm_Booking.css';
const Confirm_Booking =(props)=>{
    return (
        <div className="wrapper">
            <div className="confirmbox">
                <div>Confirm Booking?</div>
                <div className="btn_wrap">
                <div onClick={props.confirm_click} className="confirm">Confirm</div>
                <div onClick={props.cancel_click} className="cancel">Cancel</div>
                </div>
                <div>Total Price : {props.total_price}</div>
            </div>
        </div>
    )
}

export default Confirm_Booking;