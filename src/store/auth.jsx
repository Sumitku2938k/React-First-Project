import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true); //To track the loading state of user authentication
    const authorizationToken = `Bearer ${token}`;

    const API = import.meta.env.VITE_BACKEND_URL; //Accessing the backend URL from environment variable

    //Store token in local storage
    const storeTokenInLS = (serverToken) => {   
        setToken(serverToken);
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

            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                console.log("Authenticated user data : ", data.userData);
                setIsLoading(false); //Set loading to false after we have the user data, whether it's successful or not, to avoid infinite loading state
            } else {
                console.error("Failed to fetch user data");
                setIsLoading(false); //Even if the fetch fails, we should set isLoading to false to avoid infinite loading state
            }
        } catch (error) {
            console.error("Error in fetching user data : ", error);
        }
    }

    //To get all services from the server
    const [services, setServices] = useState([]);

    const getAllService = async () => {
        try {
            const response = await fetch(`${API}/api/data/services`, {
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


    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading, API}}>
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