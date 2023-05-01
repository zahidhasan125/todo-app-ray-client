// import React, { createContext, useEffect, useState } from 'react';
// import useLocalStorage from '../hooks/useLocalStorage/useLocalStorage';
// import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { app } from '../firebase/firebase.config';

// export const AuthContext = createContext();

// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//     // Set up state to track the current user and whether they are authenticated
//     const [currentUser, setCurrentUser] = useLocalStorage('loginRes', '');
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     // Create a signUp function to register new users
//     const signUp = (email, pass) => {
//         // Call your backend API to register the user


//         return createUserWithEmailAndPassword(auth, email, pass)
//         // const registerData = { email, pass };
//         // const response = await fetch(`http://192.168.1.105:5000/register`, {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //     },
//         //     body: JSON.stringify(registerData)
//         // })
//         // const registerRes = await response.json();
//         // if (registerRes.acknowledged) {
//         //     signIn(email, pass);
//         // }
//         // Set the currentUser and isAuthenticated state if registration is successful
//     };

//     // Create a signIn function to authenticate existing users
//     const signIn = (email, pass) => {
//         // Call your backend API to authenticate the user

//         return signInWithEmailAndPassword(auth, email, pass);


//         // const loginData = { email, pass };
//         // const response = await fetch(`http://192.168.1.105:5000/login`, {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //     },
//         //     body: JSON.stringify(loginData)
//         // })
//         // const loginRes = await response.json();

//         // if (loginRes?.status === 'LoggedIn') {
//         //     localStorage.setItem('todoAccessToken', `Bearer ${loginRes?.todoAccessToken}`)
//         //     localStorage.setItem('status', loginRes?.status);
//         //     localStorage.setItem('loginRes', JSON.stringify(loginRes));
//         // }
//         // // Set the currentUser and isAuthenticated state if authentication is successful
//         // setCurrentUser({ user: loginRes?.email });
//         // setIsAuthenticated(true);
//     };

//     // Create a signOut function to sign the user out of your app
//     const logOut = () => {

//         return signOut(auth);
//     };

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, user => {
//             setCurrentUser(user);
//         })
//         return () => unsubscribe();
//     }, [])

//     // Create an object to provide as the value of the AuthContext
//     const authContextValue = {
//         currentUser,
//         isAuthenticated,
//         signUp,
//         signIn,
//         logOut
//     };

//     // Provide the auth context to child components
//     return (
//         <AuthContext.Provider value={authContextValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// export default AuthProvider;


import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])


    const authValue = {
        createUser,
        userLogin,
        logOut,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;