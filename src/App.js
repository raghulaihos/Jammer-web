import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import {Route} from 'react-router-dom';
import Home from './containers/Home/Home';
import Jampads from './components/Jampads/Jampads';
import Auth from './containers/Auth/Auth_signin';
import Auth_signup from './containers/Auth/Auth_signup';
import Auth_signin from './containers/Auth/Auth_signin';

class App extends Component{
  render(){
  return (
    <div >
    <Layout >
      <Route path="/" exact component={Home} />
      <Route path="/auth/signup" exact component={Auth_signup} />
      <Route path="/auth/signin" exact component={Auth_signin} />
      <Route path="/jam-pads" component={Jampads} />
    </Layout>
    </div>
  );
}
}

export default App;
