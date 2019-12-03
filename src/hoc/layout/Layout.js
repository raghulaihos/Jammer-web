import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';
import './Layout.css';
class layout extends Component {

    state = {
        links: [
            { name: 'Home', value: '/' },
            { name: 'Jampads', value: '/jam-pads' },
            { name: 'Bookings', value: '/bookings' }
        ],
        isAuth: false,
        scroll: false
    }

    dropClickHandler = (event, inputIdentifier) => {
        //this.props.history.push(url);
        console.log(event.target.value);
        window.location.href = event.target.value;
        // this.context.history.push('/path');
    }

    componentWillMount() {
        if (localStorage.getItem('token') && localStorage.getItem('user_id')) {
            this.setState({
                isAuth: true
            })
        } 
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('mousemove', this.checkAuth);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    checkAuth = () => {
        if (localStorage.getItem('token') && localStorage.getItem('user_id')) {
            this.setState({
                isAuth: true
            })
        }
        // console.log(!localStorage.getItem('token') && !localStorage.getItem('user_id'));
    }

    handleScroll = (event) => {
        // let scrollTop = event.srcElement.body.scrollTop,
        //     itemTranslate = Math.min(0, scrollTop / 3 - 60);
        // console.log('scrolllllllll')
        let Yoffset = window.pageYOffset;

        if (Yoffset > 25 && this.state.scroll !== true) {
            this.setState({ scroll: true });
        }
        else if (Yoffset < 25 && this.state.scroll !== false)
            this.setState({ scroll: false });
    }

    authChangeHandler = (event) => {
        console.log(event.target.value);
        console.log(event.target.innerText);
        if (event.target.innerText === 'Logout') {
            this.setState({
                isAuth: false
            })
        }
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('user_id');
        // this.props.history.replace('/');
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar scroll={this.state.scroll} click={(event) => this.dropClickHandler(event)}
                    links={this.state.links} isAuth={this.state.isAuth} authChange={this.authChangeHandler}
                />
                <main className='main'>
                    {this.props.children}
                
                </main>
               
            </React.Fragment>
        );
    }

}

export default layout;