import React, { useState } from 'react';
import '../index.css'
import PauseOnHover from '../components/Carousel';
import HomeProductGrid from '../components/HomeproductsGrid';
import GetTVs from '../components/GetTVs';
import GetMobiles from '../components/GetMobiles';



function Home() {



  return (
    <>
      
      <PauseOnHover />
      <HomeProductGrid />
      <GetTVs/>
      <GetMobiles/>
       


    </>
  )
}

export default Home;
