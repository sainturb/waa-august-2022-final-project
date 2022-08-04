import './App.css';
import {Route, Routes} from "react-router";
import Public from "./public/Public";
import Private from "./private/Private";
import {createContext, useContext, useState} from "react";
import RequireAuth from "./guard/RequireAuth";
import Callback from "./public/Callback";
import NotFound from "./public/NotFound";
import RequireUserRole from "./guard/RequireUserRole";

export const AuthContext = createContext();

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/public" element={<Public title={'Public pages'}/>}/>
                <Route path="/callback" element={<Callback />}/>
                <Route path="/*" element={
                    <RequireUserRole>
                        <RequireAuth>
                            <Private/>
                        </RequireAuth>
                    </RequireUserRole>
                }/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AuthProvider>
    );
}

function AuthProvider({children}) {
    const token = localStorage.getItem('access_token');
    let [user, setUser] = useState(token ? window.atob(token.split('.')[1]) : null);
    let signIn = (newUser, callback) => {
        setUser(newUser);
        return callback();
    };

    let signOut = (callback) => {
        setUser(null);
        localStorage.clear();
        return callback();
    };

    let value = {user, signIn, signOut};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default App;
