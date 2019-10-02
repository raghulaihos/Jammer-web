import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import {Route} from 'react-router-dom';
import Home from './containers/Home/Home';
import Jampads from './components/Jampads/Jampads';
import Auth from './containers/Auth/Auth';

class App extends Component{
  render(){
  return (
    <div >
    <Layout >
      <Route path="/" exact component={Home} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/jam-pads" component={Jampads} />
    </Layout>
    </div>
  );
}
}

export default App;
