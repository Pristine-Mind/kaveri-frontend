import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Partner {
  name: string;
  logo: string;
  website: string;
}

const partners: Partner[] = [
  {
    name: 'Yeti Brewery',
    logo: 'https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/294634203_719944572676597_1530116619516893142_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ggWLlGLW3x4Q7kNvgHWcEIA&_nc_oc=AdhSOi-FR0R2grOdWhGe4y8mby6uZA2NEpkixqjBLDvyCMzaRMh7pZi1BG2iNXV4txAcfE6JcdKXGW4OcVLpSQnS&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=Ab6s56AQET7suzNpxnxD30W&oh=00_AYC5N7I3OXx1ikeg1gfjUGzWfxEuBwELzMmdjD70tCwzcQ&oe=677ED75D',
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
