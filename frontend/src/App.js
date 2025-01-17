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
    let currentUser = getCurrentUser();
    let [user, setUser] = useState(currentUser);
    let signIn = (callback) => {
        currentUser = getCurrentUser();
        setUser(currentUser);
        axios.post(`/api/users/create-current-user/${currentUser.type}`, currentUser).then(res => {});
        return callback();
    };

    let signOut = () => {
        localStorage.clear();
        setUser(null);
    };

    let redirectSignIn = () => {
        window.location.href = process.env.REACT_APP_AUTH_URL;
    }

    let redirectSignOut = () => {
        const idToken = localStorage.getItem('id_token');
        window.location.href = process.env.REACT_APP_LOGOUT_URL + '&id_token_hint=' + idToken;
    }

    let value = {user, redirectSignIn, redirectSignOut, signIn, signOut};

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
        let role = 'student';
        if (roles.find(r => r === 'admin')) {
            role = 'admin';
        }
        if (roles.find(r => r === 'faculty')) {
            role = 'faculty';
        }
        return {
            userId: parsed.sub,
            email: parsed.email,
            username: parsed.preferred_username,
            firstName: parsed.given_name,
            lastname: parsed.family_name,
            type: role
        };
    }
    return null;
}

export default App;
