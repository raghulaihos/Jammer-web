import React from 'react';
import jamBookerLogo from '../../assets/logo.jpg';
import './logo.css';
import {NavLink} from 'react-router-dom';

const logo = () => (
    <div className='logo-wrapper'>
    <NavLink className='logo' to='/'>
          <img src={jamBookerLogo} alt="MyBurger"/>
    </NavLink>
    <NavLink className='logo-text' to='/'>
    Jammer \m/
    </NavLink>
    </div>
);

export default logo;