import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class layout extends Component {

    state = {
        links: [
            { name: 'Home', value: '/' },
            { name: 'Jampads', value: '/jam-pads' },
            { name: 'Bookings', value: '/bookings' }
        ],
        scroll: false
    }

    dropClickHandler = (event, inputIdentifier) => {
        //this.props.history.push(url);
        console.log(event.target.value);
        window.location.href = event.target.value;
        // this.context.history.push('/path');
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        // let scrollTop = event.srcElement.body.scrollTop,
        //     itemTranslate = Math.min(0, scrollTop / 3 - 60);
        let Yoffset = window.pageYOffset;
       
        if(Yoffset>25&&this.state.scroll!==true){  
            this.setState({scroll:true});
        }
        else if(Yoffset<25&&this.state.scroll!==false)
        this.setState({scroll:false});
    }


    render() {
        return (
            <React.Fragment>
                <Toolbar scroll={this.state.scroll} click={(event) => this.dropClickHandler(event)}
                    links={this.state.links}
                />
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }

}

export default layout;