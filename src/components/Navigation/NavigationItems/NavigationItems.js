import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css'
import DropDown from '../dropDown/DropDown';

const navigationItems = (props) => {


    return (<React.Fragment>
        <ul className='NavItems'>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/jam-pads'>Jam pads</NavLink></li>
            <li><NavLink to='/auth'>Authentication</NavLink></li>
        </ul>
         <DropDown {...props}/> 
    </React.Fragment>);
};
export default navigationItems;