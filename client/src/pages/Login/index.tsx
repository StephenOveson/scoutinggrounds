import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/userAtom';
import { User } from '../../models/user';
import { userService } from '../../utils/api';
import { Redirect } from 'react-router-dom';

export const Login = () => {
    const [user, setUser] = useRecoilState(userState);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');

    const loginUser = () => {
        userService.login({username, password}).then(({data}) => {
            setUser(new User(data))
            setRedirect('/dashboard')
        })
    }

    return redirect ? <Redirect to={redirect} /> :
    (
        <>
            <div className='container'>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={({target: { value }}) => setUsername(value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={({target: { value }}) => setPassword(value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={loginUser}>Submit</button>
            </div>
        </>
    )
}