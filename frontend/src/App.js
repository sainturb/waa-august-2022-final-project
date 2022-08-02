import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Public from "./public/Public";
import Private from "./private/Private";
import {createContext, useContext, useState} from "react";
import RequireAuth from "./guard/RequireAuth";
import Callback from "./public/Callback";

export const AuthContext = createContext();

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/public" element={<Public title={'Public pages'}/>}/>
                    <Route path="/callback" element={<Callback />}/>
                    <Route path="/*" element={
                        <RequireAuth>
                            <Private/>
                        </RequireAuth>
                    }/>
                </Routes>
            </Router>
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
