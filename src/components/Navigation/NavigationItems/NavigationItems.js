import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css'
import DropDown from '../dropDown/DropDown';

const navigationItems = (props) => {
    return (<React.Fragment>
        <ul className='NavItems'>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/jam-pads'>Jam pads</NavLink></li>
            {props.isAuth? <li onClick={props.authChange}><NavLink to='/'>Logout</NavLink></li>
            :<li onClick={props.authChange}><NavLink to='/auth/signup'>Sign up</NavLink></li> }
        </ul>
         <DropDown {...props}/> 
    </React.Fragment>);
};
export default navigationItems;