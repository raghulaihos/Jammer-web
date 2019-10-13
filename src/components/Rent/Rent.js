import React from 'react';
import './Rent.css';
import Card from './Card/Card';


const Rent = (props) => {
    return(
        <div className="searchwrap">
        <Card {...props}></Card>
        </div>
    );
}

export default Rent;