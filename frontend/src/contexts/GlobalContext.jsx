import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosClient.js";


const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [services, setServices] = useState([]);

    const fetchData = async () => {
        const { data: servivicesData } = await axios.get(`/services`);
        setServices(servivicesData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <GlobalContext.Provider value={{
            services
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobal = () => {
    const value = useContext(GlobalContext);

    if (value === undefined) {
        throw new Error('Non sei dentro al Global Provider!');
    }
    return value;
}

export { GlobalProvider, useGlobal }