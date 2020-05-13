import React from 'react';

import * as sample from '../../assets/login-page-bg-vid.mp4';
import SignInForm from '../../components/signin-form/signin-form.component';

import './signin-page.styles.scss';


const SignInPage : React.FC = () => (
    <div className='signin-box-container'>
        <video className="background-video" id="background-video" loop autoPlay muted>
            <source src={sample.toString()} type="video/mp4" />
        </video>

        <SignInForm />

    </div>
);


export default SignInPage;

