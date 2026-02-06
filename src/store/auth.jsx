import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");

    //Store token in local storage
    const storeTokenInLS = (serverToken) => {   
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token; //if token is present then true else false
    console.log("isLoggedIn : ", isLoggedIn);

    //Tackling the Logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    //JWT Authentication - to get the currently loggedIn user data
    const userAuthentication = async () => {
        try {
            if (!token) return;

            const response = await fetch("http://localhost:3000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                console.log("Authenticated user data : ", data.userData);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error in fetching user data : ", error);
        }
    }

    //To get all services from the server
    const [services, setServices] = useState([]);

    const getAllService = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/data/services", {
                method: "GET",
            });

            if (response.ok) {
                const res_data = await response.json();
                setServices(res_data.msg);
            } else {
                console.error("Failed to fetch services data");
            }
        } catch (error) {
            console.error("Error in fetching services data : ", error);
        }
    }

    useEffect(() => {
        userAuthentication();
        getAllService();
    }, [token])


    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, services}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}