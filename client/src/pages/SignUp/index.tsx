import React, { useState } from 'react';
import { userService } from '../../utils/api';
import { useRecoilState } from 'recoil';
import { User } from '../../models/user';
import { userState } from '../../recoil/userAtom';
import { Redirect } from 'react-router-dom';

export const SignUp = () => {
    const [user, setUser] = useRecoilState(userState)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const signUpUser = () => {
        userService.signup({username, password, email}).then(({data}) => setUser(data))
    }

    return user ? (
        <>
            <div className='container'>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={({target: {value}}) => setUsername(value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={({target: {value}}) => setEmail(value)} />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={({target: {value}}) => setPassword(value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={signUpUser}>Submit</button>
            </div>
        </>
    ) : <Redirect to="/dashboard" />
}