import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Store {
  name: string;
  address: string;
  link: string;
}

const StoreLocationComponent: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/stores`);
        setStores(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data from server');
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-40">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Available Stores
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {store.name}
              </h2>

              {/* Address with map icon */}
              <div className="text-gray-600 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                <p className="text-sm">{store.address}</p>
              </div>

              <a
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 flex items-center hover:underline"
              >
                Visit Store <FaExternalLinkAlt className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLocationComponent;
