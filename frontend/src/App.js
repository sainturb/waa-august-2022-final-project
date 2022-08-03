import './App.css';
import {Route, Routes} from "react-router";
import Public from "./public/Public";
import Private from "./private/Private";
import {createContext, useContext, useState} from "react";
import RequireAuth from "./guard/RequireAuth";
import Callback from "./public/Callback";
import NotFound from "./public/NotFound";

export const AuthContext = createContext();

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/public" element={<Public title={'Public pages'}/>}/>
                <Route path="/callback" element={<Callback />}/>
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
    let [user, setUser] = useState(null);
    let [token, setToken] = useState(localStorage.getItem('access_token'));
    let signIn = (newUser, callback) => {
        setUser(newUser);
        return callback();
    };

    let signOut = (callback) => {
        setUser(null);
        localStorage.removeItem('access_token');
        return callback();
    };

    let value = {user, token, signIn, signOut};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default App;
