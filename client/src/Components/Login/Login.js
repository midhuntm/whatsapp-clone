import React from 'react'
import { Button} from '@mui/material';
import {auth,provider} from '../../firebase';
import {signInWithPopup} from 'firebase/auth';
import image1 from '../Main/whatsapp.png';
import './Login.css';
import { useStateValue } from '../ContextApi/StateProvider';
import {actionTypes} from '../ContextApi/reducer';

export default function Login() {
    const [state,dispatch] = useStateValue();
    console.log('state',state);

    const signin = () => {
        signInWithPopup(auth,provider)
        .then((result) => {
          // console.log(dispatch,'dispatch')
          let admin = result.user;
          localStorage.setItem('user',admin)
           dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
           }
           )
           
          console.log(result);
        })
        .catch((err) => {
          alert(err.message);
        })
    }
  return (
    <div className='login'>
        <div className='login_container'>
            <img src={image1}/>
                <div className='login_text'>
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button onClick={signin}>Sign In with Google</Button>
        </div>
    </div>
  )
}
