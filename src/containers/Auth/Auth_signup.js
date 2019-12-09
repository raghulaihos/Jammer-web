import React from 'react';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import axios from '../../hoc/axios/axios-jamcards';

class Auth extends React.Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        auth:undefined
    }



    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({ controls: updatedControls, formIsValid: formIsValid })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        let user = {
            name:  this.state.controls.name.value,
            email:  this.state.controls.email.value,
            password:  this.state.controls.password.value
        }
        console.log('calling signup');
        axios.put('/auth/signup', user).then(res => {
            this.setState({auth:true});
            this.props.history.replace('/auth/signin');
        }).catch(e => {
            this.setState({auth:false});
            console.log('Sign up failed!')
        });
    }
    swicthAuthHandler = () => {
        this.props.history.push('/auth/signin');
    }
    render() {
        const formElementsArray = [];
        let message  = null;
        if(this.state.auth==false){
            message = <div>User already exists</div>;
        }
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form = formElementsArray.map(formElement => (
            <Input
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        ))
        return (
            <div className='Auth'>
                <form onSubmit={this.formSubmitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Signup</Button>
                    <Button btnType="Danger" clicked={this.swicthAuthHandler}>Sign in instead?</Button>
                    {message}
                </form>
            </div>
        )
    }
}

export default Auth;