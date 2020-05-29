import React, { ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps as IReactRouterProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { signin } from '../../redux/user/user.actions';
import { fArgReturn } from '../../types/utils/FunctionTypes';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import CustomToggle from '../custom-toggle/custom-toggle.component';

import './signin-form.styles.scss';
import { findAllInRenderedTree } from 'react-dom/test-utils';


interface ILocalState {
    name: string;
    email: string,
    password: string,
    confirmPassword: string,
    isNewUser: boolean
}

interface IDispatchProps {
    signin: fArgReturn
}

type SignInFormProps = IDispatchProps & IReactRouterProps;

class SignInForm extends React.Component<SignInFormProps, ILocalState> {

    state : ILocalState = {
        name: '',
        email: '',
        password: '',
        confirmPassword:'',
        isNewUser: false
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        const  { name, value } = target;
        const stateUpdate = { [name]: value } as Pick<ILocalState, 'name' | 'email' | 'password'>;
        this.setState( stateUpdate );
    }

    handleSignIn = () => {
        const { email, password } : ILocalState = this.state;

        if (email.length && password.length)  
            this.props.signin(email, password);
    }

    registerUser = () => {
        const { email, password, name, confirmPassword } : ILocalState = this.state;

        if (email.length && password.length && name.length && confirmPassword.length)
            password === confirmPassword
                ? alert('you did it!')
                : alert('nah you suck!');
    }

    toggleNewUser = () => this.setState({ 
        isNewUser: !this.state.isNewUser, 
        name: ''
    });

    render() {

        const { isNewUser, name, email, password, confirmPassword } : ILocalState = this.state;

        return (
            <div className='authentication-form'>
                <h1>GArdenCloud</h1>

                <div className='fields-wrapper'>

                    {isNewUser &&   
                        <FormInput 
                            name='name'
                            type='text'
                            value={name}
                            label='Name'
                            handleChange={(e: ChangeEvent<HTMLInputElement>) =>  this.handleChange(e)}
                        />
                    }

                    <FormInput 
                        name='email'
                        type='text'
                        value={email}
                        label='Email'
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>  this.handleChange(e)}
                    />

                    <FormInput 
                        name='password'
                        type='password'
                        value={password}
                        label='Password'
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>  this.handleChange(e)}
                    />

                    {isNewUser &&   
                        <FormInput 
                            name='confirmPassword'
                            type='password'
                            value={confirmPassword}
                            label='Confirm Password'
                            handleChange={(e: ChangeEvent<HTMLInputElement>) =>  this.handleChange(e)}
                        />
                    }

                    <CustomButton
                        type='button'
                        onClick={() => {
                            isNewUser
                                ? this.registerUser()
                                : this.handleSignIn() 
                        }} 
                        inverted = {false}
                    >
                        {isNewUser ? 'Register' : 'Sign In' }   
                    </CustomButton>

                    <CustomToggle onClick={this.toggleNewUser} /> Register

                </div>
            </div>
        );
    }
} 


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    signin: (email : string, password : string) => dispatch<any>(signin(email, password))
});
  

export default withRouter(connect(null, mapDispatchToProps)(SignInForm));
        