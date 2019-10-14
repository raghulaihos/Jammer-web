import React from 'react';
import './Slots.css';
const Slots = (props) => {
    let time_arr = ['9am-10am', '10am-11am', '11am-12pm', '12pm-1pm', '1pm-2pm', '2pm-3pm', '3pm-4pm', '4pm-5pm', '5pm-6pm', '6pm-7pm'
    ,'7pm-8pm','8pm-9pm'];
    return (
        <React.Fragment>
            <div className="slotwrap">
                {
                    props.slots.map((slot, i) => {
                        let bt_class;
                        if(slot==='open'){
                            bt_class='slot_green';
                        }else if(slot==='booked'){
                            bt_class='slot_booked';
                        }else{
                            bt_class='slot_red';
                        }
                        return (
                            <React.Fragment key={i}>
                            <div key={i} className="time">
                            {time_arr[i]}
                            <div/>
                            <div onClick={()=>props.click(i)} key={i}
                             className={bt_class}>
                                {slot}
                            </div>
                            </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </React.Fragment>
    );
}

export default Slots;