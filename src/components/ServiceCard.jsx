import "./ServiceCard.css";

const ServiceCard = ({ provider, price, title, description }) => {
    return (
        <div className="service-card">
            <div className="service-image">
                <img src='/images/design.png' alt='service image' />
            </div>

            <div className="service-content">
                <div className="service-meta">
                    <span className="category">{provider}</span>
                    <span className="price">{price}</span>
                </div>
        
                <h3 className="service-title">{title}</h3>
                <p className="service-description">{description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
