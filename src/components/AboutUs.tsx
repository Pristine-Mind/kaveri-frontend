import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  // image: string;
  instagram: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Bishnu Bhattarai',
    role: 'Business Development Manager',
    bio: 'Bishnu Bhattarai is our business development manager, responsible for establishing and maintaining strong relationships with our clients. With a passion for Nepali culture and beverages, Bishnu ensures our customers receive exceptional service and support.',
    // image: 'https://example.com/path-to-bishnu-image.jpg',
    instagram: 'https://www.instagram.com/looooray?igsh=Y3hjZmJ1cXlwa2Yw&utm_source=qr',
  },
  {
    id: 2,
    name: 'Mik Adhikari',
    role: 'Operations & Logistics Lead',
    bio: 'Mik Adhikari leads our operations and logistics team, ensuring the seamless import and distribution of our Nepali alcoholic beverages. His expertise in supply chain management and his commitment to quality make him a valuable asset to Kaveri International.',
    // image: 'https://example.com/path-to-mik-image.jpg',
    instagram: 'https://www.instagram.com/mickey_man8/?utm_source=qr&igsh=emNpOGV5NHBiZ2Ry',
  },
  {
    id: 3,
    name: 'Reshma Poudel',
    role: 'Managing Director',
    bio: 'Reshma Poudel serves as the Managing Director of our company, overseeing its overall management and strategic direction. In this capacity, she is responsible for operational management, financial oversight, and stakeholder engagement. Additionally, she provides leadership to the team and plays a crucial role in decision-making related to policy and strategy.',
    // image: 'https://example.com/path-to-reshma-image.jpg',
    instagram: 'https://www.instagram.com/reshu_poudel?igsh=MXV1d2RyaHZ6NXlqZA%3D%3D&utm_source=qr',
  },
];

const AboutUs: React.FC = () => {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out-back' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 py-16 pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
            About Us
          </h1>
          <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-4">
              As a wholesaler, Kaveri International's role would be to supply Nepali alcoholic beverages in bulk to distributors, retailers, and possibly even bars and restaurants in Texas. Your business model likely focuses on:
            </p>
            <ul className="text-gray-700 text-lg md:text-xl leading-relaxed list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Bulk Importing</span> – Bringing high-quality Nepali alcoholic beverages into the U.S. market in large quantities.
              </li>
              <li>
                <span className="font-semibold">Distribution</span> – Building relationships with distributors and retailers who can sell these products to end consumers.
              </li>
              <li>
                <span className="font-semibold">Catering to Demand</span> – Meeting the growing demand from the Nepalese community and beyond for premium Nepali beers and spirits.
              </li>
              <li>
                <span className="font-semibold">Logistics and Compliance</span> – Ensuring timely delivery and compliance with U.S. import regulations and alcohol laws.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map(member => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                data-aos="fade-up"
              > 
                <div className="mb-4">
                  <img
                    src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
                    // alt={member.name}
                    className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">{member.name}</h3>
        
                <p className="text-md font-medium text-blue-900 mb-3">{member.role}</p>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex space-x-2 mt-4">
                  <a 
                    href={member.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-2 px-4 text-sm bg-blue-600 text-white rounded-md hover:bg-pink-700 focus:outline-none transition duration-200 flex items-center"
                  >
                    Contact {member.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
