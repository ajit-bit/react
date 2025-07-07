import ring1 from '../assets/images/ring1.jpg';
import watch from '../assets/images/watch.jpg';

const PromoSection = () => {
    return (
        <section className="hero">
            <div className="card">
                <img src={ring1} alt="Wedding Ring" />
                <div className="content">
                    <p className="subtitle">New Collection</p>
                    <h2>Wedding Rings</h2>
                    <p className="text">
                        Celebrate your love with our exquisite collection of wedding rings
                    </p>
                    <a href="#" className="btn">Discover more</a>
                </div>
            </div>
            <div className="card">
                <img src={watch} alt="Luxury Watch" />
                <div className="content">
                    <p className="subtitle">Timeless Beauty</p>
                    <h2>Luxury Watches</h2>
                    <p className="text">
                        Discover the perfect accessory that defines your unique sense of luxury.
                    </p>
                    <a href="#" className="btn">Discover more</a>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;