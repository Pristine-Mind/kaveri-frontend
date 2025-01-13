import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import yeti from '../assets/yeti.jpg'

interface Partner {
  name: string;
  logo: string;
  website: string;
}

const partners: Partner[] = [
  {
    name: 'Yeti Brewery',
    logo: yeti,
    website: 'https://yetibrewery.com/',
  },
  {
    name: 'CG Brewery',
    logo: "https://nepalice.com.np/wp-content/uploads/2023/02/about-us.jpg",
    website: 'https://www.chaudharygroup.com/brewery',
  },
];

const Partners: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-40">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Brewery Partners
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} Logo`}
                className="h-24 mb-4 object-contain"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {partner.name}
              </h2>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 flex items-center hover:underline"
              >
                Visit Website <FaExternalLinkAlt className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
