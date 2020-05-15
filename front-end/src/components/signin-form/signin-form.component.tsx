import React, { ChangeEvent } from 'react';

import FormInput from '../form-input/form-input.component';

import './signin-form.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

interface ISignInState {
    email: string,
    password: string,
}

class SignInForm extends React.Component<{},{}> {

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
                        onClick={ () => console.log('I am clicked!')} 
                        inverted = {false}
                    >
                        Sign In    
                    </CustomButton>                  
                </div>
            </div>
        );
    }
} 



export default SignInForm;
        