import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExternalLinkAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

interface Store {
  name: string;
  address: string;
  link: string;
}

const StoreLocationComponent: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-40">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Find Beer Near You
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by store name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Display message if no stores match the search query */}
        {filteredStores.length === 0 ? (
          <p className="text-center text-gray-500">No stores found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredStores.map((store, index) => (
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
        )}
      </div>
    </div>
  );
};

export default StoreLocationComponent;
