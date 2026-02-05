import ServiceCard from "../components/ServiceCard";
import { useEffect, useState } from "react";
import "./Service.css";  
import { useAuth } from "../store/auth";
    
const ServicesPage = () => {
    const {services} = useAuth(); // Access services from the auth store

    return (
        <div className="services-grid">
            {services.map((service, index) => (
                <ServiceCard key={service._id} title={service.service} description={service.description} price={service.price} provider={service.provider}/>
            ))}
        </div>
    );
};

export default ServicesPage;
