import React, { createContext, useState } from 'react';
import { UserLogin, UserRegister } from '../api/auth';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState([])

    const loginUser = async (data) => {
        let res = await UserLogin(data);

        if (res != null) {
            setUser(res)
            localStorage.setItem('userData', JSON.stringify(res));
            return true;
        } else {
            return false;
        }
    }

    const registerUser = async (data) => {
        let res = await UserRegister(data);

        if (res != null) {
            return true;
        } else {
            alert('unable to register user')
            return false;
        }
    }

    const setUserData = async (data) => {
        setUser(data)
    }

    return (
        <AuthContext.Provider value={{
            user, loginUser, setUserData, registerUser
        }}>
            {props.children}

        </AuthContext.Provider>
        // <AuthContext.Provider value={{
        //     user, setUserData, loginUser,
        // }}>
        //     {props.children}
        // </AuthContext.Provider>
    )
}


export default AuthContextProvider;