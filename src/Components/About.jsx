import React from 'react';
import { AiOutlineRise } from "react-icons/ai";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import AboutCard from './AboutCard';
import '../tailwind.css';

const About = () => {
  return (
    <div className='w-full py-8 bg-gray text-neutral text-center'>
      <div className='max-w-[1240px] mx-auto px-4 pt-8 '>
        <div>
          <h1 className='py-4 text-3xl'>Services, We Provide You With</h1>
          <p className='py-4 text-xl mb-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nulla ex sunt in sit ad ullam consequuntur. Labore, debitis sed? sunt in sit ad ullam consequuntur. Labore, debitis sed? 
          </p>

          {/* Card Container */}
          <div className='grid sm:grid-cols-3 lg:grid-cols-3 gap-12'>

            {/* Card */}
            <AboutCard icon={<MdConnectWithoutContact size={40} />} heading='People-Venues Bridge' text='Build on a flexible framework that can retrieve data from any API, connect with existing systems, and integrate with any current or future blockchain.' />
            <AboutCard icon={<FaArrowsDownToPeople size={40} />} heading='Teams Matching' text='Integrate pre-built, time-tested oracle solutions that already secure tens of billions in smart contract value for market-leading decentralized applications.' />
            <AboutCard icon={<RiDashboardFill size={40} />} heading='Personalized Dashboards' text='Use a decentralized network of DeFi Keeper nodes to automate contracts, mitigating risk of manual interventions and centralized servers.' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;