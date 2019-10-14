import React from 'react';
import './Equipments.css';

const Equipments = (props) => {
    return (
        <div className="equipments">
            <React.Fragment>
                {
                    props.equipment.map(item => {
                        return (
                            <div key={item.id} className="details">
                                {item.id} : {item.key}
                            </div>
                        );
                    })
                }
            </React.Fragment>
            <br/>
            <div className='details'>
            Total Price: {props.total_price}
            </div>
            <br/>
            <div onClick={props.click} className='book'>
                Book
            </div>
            </div>
            );
        }
        
export default Equipments;