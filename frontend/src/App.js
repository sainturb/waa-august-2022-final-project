import './App.css';
import {Route, Routes} from "react-router";
import Public from "./public/Public";
import Private from "./private/Private";
import {createContext, useContext, useState} from "react";
import RequireAuth from "./guard/RequireAuth";
import Callback from "./public/Callback";
import NotFound from "./public/NotFound";
import LoggedOut from "./public/LoggedOut";
import axios from "axios";

export const AuthContext = createContext();

function App() {
    const UNAUTHORIZED = 401;

    return (
        <AuthProvider>
            <Routes>
                <Route path="/public" element={<Public title={'Public pages'}/>}/>
                <Route path="/callback" element={<Callback/>}/>
                <Route path="/logged-out" element={<LoggedOut/>}/>
                <Route path="/*" element={
                    <RequireAuth>
                        <Private/>
                    </RequireAuth>
                }/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AuthProvider>
    );
}

function AuthProvider({children}) {
    let [user, setUser] = useState(getCurrentUser());
    let signIn = (callback) => {
        setUser(getCurrentUser());
        return callback();
    };

    let signOut = () => {
        localStorage.clear();
        setUser(null);
    };

    let redirectSignOut = () => {
        const idToken = localStorage.getItem('id_token');
        window.location.href = process.env.REACT_APP_LOGOUT_URL + '&id_token_hint=' + idToken;
    }

    let value = {user, redirectSignOut, signIn, signOut};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const getCurrentUser = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        const parsed  = JSON.parse(window.atob(token.split('.')[1]));
        const roles =  parsed.realm_access.roles
        const role = roles.find(r => r === 'admin') ? roles.find(r => r === 'admin') : roles.find(r => r === 'faculty') ? roles.find(r => r === 'faculty') : roles.find(r => r === 'student') ? roles.find(r => r === 'student') : null;
        return {
            id: parsed.sub,
            email: parsed.email,
            firstName: parsed.given_name,
            lastname: parsed.family_name,
            personType: role
        };
    }
    return null;
}

export default App;
