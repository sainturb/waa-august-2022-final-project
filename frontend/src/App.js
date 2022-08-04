import './App.css';
import {Route, Routes} from "react-router";
import Public from "./public/Public";
import Private from "./private/Private";
import {createContext, useContext, useState} from "react";
import RequireAuth from "./guard/RequireAuth";
import Callback from "./public/Callback";
import NotFound from "./public/NotFound";
import LoggedOut from "./public/LoggedOut";

export const AuthContext = createContext();

function App() {
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
    const token = localStorage.getItem('access_token');
    let [user, setUser] = useState(token ? window.atob(token.split('.')[1]) : null);
    let signIn = (callback) => {
        if (token) {
            setUser(window.atob(token.split('.')[1]));
        }
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

export default App;
