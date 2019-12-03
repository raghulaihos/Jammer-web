import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css'
import DropDown from '../dropDown/DropDown';

const navigationItems = (props) => {
    const Auth = (
        <React.Fragment>
             <li><NavLink to='/search'>Search</NavLink></li>
             <li onClick={props.authChange}><NavLink to='/'>Logout</NavLink></li>
             </React.Fragment>
    )
    return (<React.Fragment>
        <ul className='NavItems'>
            <li><NavLink to='/'>Home</NavLink></li>
            {props.isAuth? Auth:<li onClick={props.authChange}><NavLink to='/auth/signin'>Sign in</NavLink></li> }
        </ul>
         <DropDown {...props}/> 
    </React.Fragment>);
};
export default navigationItems;