import React from 'react';
import { NavLink } from 'react-router-dom';
import './DropDown.css';

class dropDown extends React.Component {

  state = {
    drop: false
  }

  dropClickHandler = () => {
    this.setState(prev => {
      return { drop: !prev.drop };
    })
  }

  componentDidMount() {
    console.log(this.props.links);
  }
  render() {
    // return <select onChange={this.props.click} className="navDrop" value='Browse'>
    //   {
    //     this.props.links.map(item=>{
    //       return <option  key={item.name} value={item.value}>{item.name}<NavLink to={item.value}></NavLink></option>
    //     })
    //     }
    // </select>

    return <React.Fragment>
      {/* <div className='tag'><li onClick={this.dropClickHandler} id='tag'>Browse</li> */}
      <div className='dropWrap' onClick={this.dropClickHandler}>
      <span className='dropBrowse'>Browse</span>
      <ul className='navDrop'>
        {this.props.links.map(item => {
          return <NavLink to={item.value} key={item.name}><li className={this.state.drop ? 'drop' : 'dontDrop'} >{item.name}</li></NavLink>
        })}
      </ul>
      </div>
      {/* </div> */}
    </React.Fragment>

  }
}

export default dropDown;