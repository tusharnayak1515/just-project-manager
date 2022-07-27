import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';

const Login = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({email: "", password: ""});
  const dispatch = useDispatch();
//   const {user} = useSelector(state=> state.userReducer,shallowEqual);
    const user = getCookie("user_token");

  const onValueChange = (e)=> {
    e.preventDefault();
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  const onLogin = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.login(userDetails));
  }

  useEffect(() => {
    if(user) {
        router.push('/');
    }
  }, [user]);
  

  return (
    <div>
        <input type="email" name="email" placeholder='Email' value={userDetails.email} onChange={onValueChange} />
        <input type="password" name="password" placeholder='Password' value={userDetails.password} onChange={onValueChange} />
        <button onClick={onLogin}>Login</button>
    </div>
  )
}

export default Login;