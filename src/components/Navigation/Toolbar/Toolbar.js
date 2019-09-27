import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={props.scroll?'toolbar scroll':'toolbar'}>
        <Logo/>
        <NavigationItems {...props}/>
    </header>
);

export default toolbar;