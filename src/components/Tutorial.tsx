import React, { useState } from 'react';

const Tutorial = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className='flex font-bold leading-snug tracking-normal text-slate-800 w-full text-l lg:max-w-l lg:text-xl'>
        <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" aria-hidden="true" data-slot="icon">
          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"/>
        </svg>
        <span className='px-4'>{item.title}</span>
      </h3>

      <div className="mt-2 text-gray-600 pl-8">
        {item.description}
      </div>

    </div>
  );
};

export default Tutorial;