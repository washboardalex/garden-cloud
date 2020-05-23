import React, { ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps as IReactRouterProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { signin } from '../../redux/user/user.actions';
import { fArgReturn } from '../../types/utils/FunctionTypes';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './signin-form.styles.scss';




interface ILocalState {
    email: string,
    password: string,
}

interface IDispatchProps {
    signin: fArgReturn
}

type SignInFormProps = IDispatchProps & IReactRouterProps;

class SignInForm extends React.Component<SignInFormProps, ILocalState> {

    state : ILocalState = {
        email: '',
        password: ''
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        const  { name, value } = target;
        const stateUpdate = { [name]: value } as Pick<ILocalState, keyof ILocalState>;
        this.setState( stateUpdate );
    }

    handleSignIn = () => {
        const { email, password } : ILocalState = this.state;

        if (email !== '' && password !== '')  
            this.props.signin(email, password);

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


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    signin: (email : string, password : string) => dispatch<any>(signin(email, password))
});
  

export default withRouter(connect(null, mapDispatchToProps)(SignInForm));
        