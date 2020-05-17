import React, { ChangeEvent } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps as IReactRouterProps } from 'react-router';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './signin-form.styles.scss';

interface ISignInState {
    email: string,
    password: string,
}

class SignInForm extends React.Component<IReactRouterProps, ISignInState> {

    state : ISignInState = {
        email: '',
        password: ''
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        const  { name, value } = target;
        const stateUpdate = { [name]: value } as Pick<ISignInState, keyof ISignInState>;
        this.setState( stateUpdate );
    }

    handleSignIn = () => {
        const { email, password } : ISignInState = this.state;
        if (email !== '' && password !== '') 
            axios.post('http://localhost:3001/api/signin', {
                email, 
                password
            })
            .then((response) => {
                if (response.status === 200) 
                    this.props.history.push('/home')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='sign-in-form'>
                <h1>GArdenCloud</h1>

                <div className='fields-wrapper'>
                    <FormInput 
                        name='email'
                        type='text'
                        value={this.state.email}
                        label='Email'
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>  this.handleChange(e)}
                    />

                    <FormInput 
                        name='password'
                        type='password'
                        value={this.state.email}
                        label='Password'
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>  this.handleChange(e)}
                    />

                    <CustomButton
                        type='button'
                        onClick={ () => this.handleSignIn()} 
                        inverted = {false}
                    >
                        Sign In    
                    </CustomButton>                  
                </div>
            </div>
        );
    }
} 



export default withRouter(SignInForm);
        