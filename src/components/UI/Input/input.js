import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value!</p>;
    }
    switch (props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case 'textarea':
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
        case 'select':
            inputElement = (
                <select onChange={props.changed} className={inputClasses.join(' ')} value={props.value} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}> {option.displayValue}</option>
                    ))}
                </select>)
                ;
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
    }
    return (
        <div className={classes.Input}>
            {/* <label className={classes.label}>{props.label}</label> */}
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;