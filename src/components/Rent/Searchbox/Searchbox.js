import React from 'react';
import './Searchbox.css';
const Searchbox = (props) => {
    return(
       <React.Fragment>
       <div className="searchw">
            <input  className="searchbox" type="text" id="myInput" onChange={props.change} placeholder="Search for jamrooms.." title="Type in a name"/>
        <ul className="drop">
            {
                props.filt.map(val=>{
                    return (<li onClick={()=>props.click(val.name, val.price)} key={val.id}>{val.name}</li>)
                })
            }
        </ul>
        </div>
        </React.Fragment>
    )
}

export default Searchbox;