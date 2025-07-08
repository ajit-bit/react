import React from 'react';

// Import Bootstrap CSS at the top level of your page/app
import 'bootstrap/dist/css/bootstrap.min.css';

// Import all the components (no changes here)
import Slider from '../components/Slider';
import CategoryCarousel from '../components/CategoryCarousel';
import NewCollection from '../components/NewCollection';
import Trending from '../components/Trending';
import TopProducts from '../components/TopProducts';
import PromoSection from '../components/PromoSection';
import Essentials from '../components/Essentials';
import ShopByPrice from '../components/ShopByPrice';
import Newsletter from '../components/Newsletter';
import MustHaves from '../components/MustHaves';
import AvailableAt from '../components/AvailableAt';
import Testimonials from '../components/Testimonials';
import Features from '../components/Features';
// Footer component was not provided, but would be imported here
// import Footer from '../components/Footer'; 

const Home = () => {
  return (
    <div>
      <Slider />
      <CategoryCarousel />
      <NewCollection />
      <Trending />
      <TopProducts />
      <PromoSection />
      <Essentials />
      <ShopByPrice />
      <Newsletter />
      <MustHaves />
      <AvailableAt />
      <Testimonials />
      <Features />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;