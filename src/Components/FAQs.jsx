import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className='mb-4 border-b pb-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={toggle}>
        <div className='text-lg md:text-xl lg:text-2xl xl:text-3xl'>{question}</div>
        {isOpen ? (
          <IoIosArrowDown className='transform rotate-180 text-lg md:text-xl lg:text-2xl xl:text-3xl' />
        ) : (
          <IoIosArrowDown className='transform rotate-0 text-lg md:text-xl lg:text-2xl xl:text-3xl' />
        )}
      </div>
      {isOpen && <div className='mt-2 text-gray-600 text-sm md:text-base lg:text-lg xl:text-xl'>{answer}</div>}
    </div>
  );
};

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(Array(5).fill(false)); // Initially, all questions are closed

  const toggleFAQ = (index) => {
    const newOpenState = [...isOpen];
    newOpenState[index] = !newOpenState[index];
    setIsOpen(newOpenState);
  };

  return (
    <div className='bg-gray text-neutral py-8'>
      <div className='max-w-full md:max-w-2xl mx-auto px-4'>
        <h2 className='text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8'>
          Our Most Asked Questions
        </h2>
        <div className='mb-8'>
          <input
            type='text'
            placeholder='Didn’t find an answer? Ask us!'
            className='w-full px-4 py-2 rounded-full bg-gray-900 text-gray focus:outline-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <FAQItem
          question='What is Lorem Ipsum?'
          answer='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          isOpen={isOpen[0]}
          toggle={() => toggleFAQ(0)}
        />
        <FAQItem
          question='Why do we use it?'
          answer='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          isOpen={isOpen[1]}
          toggle={() => toggleFAQ(1)}
        />
        <FAQItem
          question='Where does it come from?'
          answer='Contrary to popular belief, Lorem Ipsum is not simply random text.'
          isOpen={isOpen[2]}
          toggle={() => toggleFAQ(2)}
        />
        <FAQItem
          question='What is Lorem Ipsum?'
          answer='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          isOpen={isOpen[3]}
          toggle={() => toggleFAQ(3)}
        />
        <FAQItem
          question='Why do we use it?'
          answer='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          isOpen={isOpen[4]}
          toggle={() => toggleFAQ(4)}
        />
      </div>
    </div>
  );
};

export default FAQs;