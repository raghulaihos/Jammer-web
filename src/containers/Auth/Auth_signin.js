import React from 'react';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import axios from '../../hoc/axios/axios-jamcards';


class Auth extends React.Component {
    state = {
        controls: {
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
        formIsValid: false
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

    swicthAuthHandler = () => {
        this.props.history.push('/auth/signup');
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        let user = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        console.log('calling signin');
        axios.post('/auth/signin', user).then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_id', res.data.user_id);
            const remainingMilliseconds = (60 * 60 * 1000);
            localStorage.setItem('expiryDate', remainingMilliseconds);
            this.setAutoLogout(remainingMilliseconds);
            console.log('signin complete', res);
            this.props.history.replace('/');
        }).catch(e => console.log('Sign in failed!'));
    }

    setAutoLogout = milliseconds => {
        setTimeout(() => {
            this.logoutHandler();
        }, milliseconds);
    };

    logoutHandler = () => {
        this.setState({ isAuth: false, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('user_id');
    };

    render() {
        const formElementsArray = [];
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
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Login</Button>
                    <Button btnType="Danger" clicked={this.swicthAuthHandler}>Sign up instead?</Button>
                </form>
            </div>
        )
    }
}

export default Auth;