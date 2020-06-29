import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userAtom';

export const Navbar = () => {
    const user = useRecoilValue(userState)
    return (
        <ul className="nav flex-row navbar-light bg-light">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            {!user.username && <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>}
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
        </ul>
    )
}