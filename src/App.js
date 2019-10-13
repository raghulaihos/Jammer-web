import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import {Route} from 'react-router-dom';
import Home from './containers/Home/Home';
import Search from './containers/Search/Search';
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
      <Route path="/search" component={Search} />
      {/* <Route path="/search/Bread_and_Jaam" exact component={Search} />
      <Route path="/search/Astral_Studios" exact component={Search} />
      <Route path="/search/Boom_Box_house" exact component={Search} />
      <Route path="/search/Audio_Academyq" exact component={Search} /> */}
    </Layout>
    </div>
  );
}
}

export default App;
