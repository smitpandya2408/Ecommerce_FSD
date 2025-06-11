import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSaller from '../components/BestSaller'
import OurPolicy from '../components/OurPolicy'
import Newslatter from '../components/Newslatter'

function Home() {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSaller/>
      <OurPolicy/>
      <Newslatter/>
    </div>
  )
}

export default Home