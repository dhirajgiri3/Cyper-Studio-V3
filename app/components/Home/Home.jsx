"use client";

import React from "react";
import Hero from "./Sections/Hero/Hero";
import Story from "./Sections/Story/Story";
import Approach from "./Sections/Approach/Approach";
import Dream from "./Sections/Dream/Dream";
import ContactCard from "../Common/ContactCard/ContactCard"

function Home() {
  return (
    <div>
      <Hero />
      <Story />
      <Approach />
      <Dream /> 
      {/* <ContactCard /> */}
    </div>
  );
}

export default Home;
