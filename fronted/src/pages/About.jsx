import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Newslatter from "../components/Newslatter"; 

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Explore our handpicked selection of the season’s freshest arrivals.
            From stylish fashion essentials to must-have accessories, our latest
            collections
          </p>
          <p>
            are crafted to elevate your everyday look. Whether you're refreshing
            your wardrobe or shopping for gifts, we’ve got something new for
            everyone.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Explore our handpicked selection of the season’s freshest arrivals.
            From stylish fashion essentials to must-have accessories, our latest
            collections
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Explore our handpicked selection of the season’s freshest arrivals.
            From stylish fashion essentials to must-have accessories, our latest
            collections
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b> {/* Fixed typo from "Convenince" to "Convenience" */}
          <p className="text-gray-600">
            Explore our handpicked selection of the season’s freshest arrivals.
            From stylish fashion essentials to must-have accessories, our latest
            collections
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Explore our handpicked selection of the season’s freshest arrivals.
            From stylish fashion essentials to must-have accessories, our latest
            collections
          </p>
        </div>
      </div>

      <Newslatter />
    </div>
  );
};

export default About;
