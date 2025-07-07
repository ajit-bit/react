// src/components/Essentials.jsx
import essentialsVacation from '../assets/images/essentials-vacation.jpg';
import essentialsWork from '../assets/images/essentials-work.jpg';
import essentialsCasual from '../assets/images/essentials-casual.jpg';
import essentialsWedding from '../assets/images/essentials-wedding.jpg';

const Essentials = () => {
    return (
        <section className="section-essentials">
            <h1 className="heading-essentials">Essentials For You</h1>
            <div className="grid-essentials">
                <div className="card-essentials">
                    <img src={essentialsVacation} alt="Vacation Essentials" />
                    <h2>VACAY</h2>
                    <button>Discover</button>
                </div>
                <div className="card-essentials">
                    <img src={essentialsWork} alt="Work Mode Essentials" />
                    <h2>WORK</h2>
                    <button>Discover</button>
                </div>
                <div className="card-essentials">
                    <img src={essentialsCasual} alt="Casual Essentials" />
                    <h2>CASUAL</h2>
                    <button>Discover</button>
                </div>
                <div className="card-essentials">
                    <img src={essentialsWedding} alt="Wedding Essentials" />
                    <h2>WEDDING</h2>
                    <button>Discover</button>
                </div>
            </div>
        </section>
    );
};

export default Essentials;