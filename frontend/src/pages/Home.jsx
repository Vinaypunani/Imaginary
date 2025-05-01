import React from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Description from '../components/Description'
import GenerateButton from '../components/GenerateButton'

const Home = () => {
  return (
    <div>
        <Hero />
        <Steps />
        <Description />
        <GenerateButton />
    </div>
  )
}

export default Home