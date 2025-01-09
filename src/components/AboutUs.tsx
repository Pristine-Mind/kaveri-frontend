import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  instagram: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Bishnu Bhattarai',
    role: 'Business Development Manager',
    bio: 'Bishnu Bhattarai is our business development manager, responsible for establishing and maintaining strong relationships with our clients. With a passion for Nepali culture and beverages, Bishnu ensures our customers receive exceptional service and support.',
    instagram: 'https://www.instagram.com/looooray?igsh=Y3hjZmJ1cXlwa2Yw&utm_source=qr',
  },
  {
    id: 2,
    name: 'Mik Adhikari',
    role: 'Operations & Logistics Lead',
    bio: 'Mik Adhikari leads our operations and logistics team, ensuring the seamless import and distribution of our Nepali alcoholic beverages. His expertise in supply chain management and his commitment to quality make him a valuable asset to Kaveri International.',
    instagram: 'https://www.instagram.com/mickey_man8/?utm_source=qr&igsh=emNpOGV5NHBiZ2Ry',
  },
  {
    id: 3,
    name: 'Reshma Poudel',
    role: 'Managing Director',
    bio: 'Reshma Poudel serves as the Managing Director of our company, overseeing its overall management and strategic direction. In this capacity, she is responsible for operational management, financial oversight, and stakeholder engagement.',
    instagram: 'https://www.instagram.com/reshu_poudel?igsh=MXV1d2RyaHZ6NXlqZA%3D%3D&utm_source=qr',
  },
];

const AboutUs: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out-back' });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* About Us Section */}
      <section 
      className="px-4 py-16 pt-40 bg-contain bg-center" 
      // style={{ backgroundImage: "url('https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/301779405_5262329707211551_7913688105725453649_n.jpg?stp=dst-jpg_s2048x2048_tt6&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=blW10j1FPBoQ7kNvgGXGx07&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=A0na1TyBTeOsu-_n30Aaflj&oh=00_AYCo7M7_fPCQnVoYQV2XMvpTspYbFcJXWRogj1PIl70DIg&oe=6785471E')" }} // Replace with your image URL
      >
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          {/* Get to Know Us Section */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0 bg-white bg-opacity-60 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
                Get to Know Us
              </h1>
              <div className="w-24 h-1 bg-yellow-400 mb-6 mx-auto md:mx-0"></div>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                Kaveri International is a company importing high-quality Nepali alcoholic beverages into the United States. 
                Our main goal is to provide the Nepalese community in US with top-notch Nepali beer. We aim to bring the 
                authentic taste of Nepal to the US market, catering to the growing demand for premium and strong Nepali alcoholic beverages.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Business Focus Grid */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">Our business model focuses on</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center" data-aos="fade-up">
            <div className="bg-yellow-400 text-black font-semibold py-6 px-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 max-w-lg mx-auto">
              <h3 className="text-xl mb-2">Bulk Importing</h3>
              <p className="text-sm font-normal">High-quality beverages in large quantities.</p>
            </div>
            <div className="bg-yellow-400 text-black font-semibold py-6 px-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 max-w-lg mx-auto">
              <h3 className="text-xl mb-2">Distribution</h3>
              <p className="text-sm font-normal">Strong relationships with distributors and retailers.</p>
            </div>
            <div className="bg-yellow-400 text-black font-semibold py-6 px-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 max-w-lg mx-auto">
              <h3 className="text-xl mb-2">Catering to Demand</h3>
              <p className="text-sm font-normal">Meeting growing demand for premium beverages.</p>
            </div>
            <div className="bg-yellow-400 text-black font-semibold py-6 px-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 max-w-lg mx-auto">
              <h3 className="text-xl mb-2">Logistics and Compliance</h3>
              <p className="text-sm font-normal">Ensuring timely delivery and adherence to regulations.</p>
            </div>
          </div>
        </div>
        <div
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-400 to-red-600 mt-24 text-center"
          data-aos="fade-up"
        >
          Local roots to global heights
        </div>
      </section>
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-5xl font-bold mb-2">2024</h3>
              <p className="text-lg">Year Established</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold mb-2">1</h3>
              <p className="text-lg">Branch Locations</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold mb-2">3</h3>
              <p className="text-lg">Employees</p>
            </div>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
            data-aos="fade-down"
          >
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                data-aos="fade-up"
              >
                <div className="mb-4">
                  <img
                    src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
                    alt={member.name}
                    className="rounded-full w-32 h-32 object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-md font-medium text-blue-900 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {member.bio}
                </p>
                <div className="mt-4">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 text-sm bg-blue-600 text-white rounded-md hover:bg-pink-700 focus:outline-none transition duration-200"
                  >
                    Contact {member.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
