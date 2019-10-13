import React from 'react';
import './Equipments.css';

const Equipments = (props)=>{
    return(
        <div className="equipments">
         <React.Fragment>
           {
               props.equipment.map(item=>{
                   return(              
                   <div key={item.id} className="details">{item.id} : {item.key}</div>
                   );
               })
           }
           </React.Fragment>
        </div>
    );
}

export default Equipments;