import React, { createContext, useState } from 'react';
import { UserLogin } from '../api/auth';

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

    const setUserData = async (data) => {
        setUser(data)
    }



    return (
        <AuthContext.Provider value={{
            user, setUserData, loginUser,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;