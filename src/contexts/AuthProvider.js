import React, { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage/useLocalStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Set up state to track the current user and whether they are authenticated
    const [currentUser, setCurrentUser] = useLocalStorage('loginRes', '');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Create a signUp function to register new users
    const signUp = async (email, pass) => {
        // Call your backend API to register the user
        const registerData = { email, pass };
        const response = await fetch(`http://192.168.1.105:5000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        const registerRes = await response.json();
        if (registerRes.acknowledged) {
            signIn(email, pass);
        }
        // Set the currentUser and isAuthenticated state if registration is successful
    };

    // Create a signIn function to authenticate existing users
    const signIn = async (email, pass) => {
        // Call your backend API to authenticate the user
        const loginData = { email, pass };
        const response = await fetch(`http://192.168.1.105:5000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        const loginRes = await response.json();

        if (loginRes?.status === 'LoggedIn') {
            localStorage.setItem('todoAccessToken', `Bearer ${loginRes?.todoAccessToken}`)
            localStorage.setItem('status', loginRes?.status);
            localStorage.setItem('loginRes', JSON.stringify(loginRes));
        }
        // Set the currentUser and isAuthenticated state if authentication is successful
        setCurrentUser({ user: loginRes?.email });
        setIsAuthenticated(true);

    };

    // Create a signOut function to sign the user out of your app
    const signOut = () => {
        // Call your backend API to sign the user out
        localStorage.setItem('todoAccessToken', '');
        // Clear the currentUser and isAuthenticated state
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    // Create an onAuthStateChanged function to listen for changes in the user's authentication state
    // const onAuthStateChanged = (callback) => {
    //     // Define a function to check the user's authentication state
    //     const checkAuthState = () => {
    //         const storedAuthData = localStorage.getItem('todoAccessToken');
    //         const user = storedAuthData ? currentUser : null;
    //         callback(user);
    //     };

    //     // Check the user's authentication state initially
    //     checkAuthState();

    //     // Set up a listener for changes in Local Storage
    //     window.addEventListener('storage', (event) => {
    //         if (event.storageArea === localStorage && event.key === 'todoAccessToken') {
    //             checkAuthState();
    //         }
    //     });
    // };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(currentUser => {
    //         setCurrentUser(currentUser);
    //     })
    //     return () => unsubscribe();
    // })

    // Create an object to provide as the value of the AuthContext
    const authContextValue = {
        currentUser,
        isAuthenticated,
        signUp,
        signIn,
        signOut
    };

    // Provide the auth context to child components
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;