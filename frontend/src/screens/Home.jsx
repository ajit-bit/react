import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

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

const Home = () => {
  return (
    <div>
      <br />
      <br />
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