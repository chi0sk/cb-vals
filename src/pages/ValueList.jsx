import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import Filter from '../components/Filter';
import itemsData from '../data/items';

const ValueList = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Apply initial filtering on component mount
  useEffect(() => {
    setFilteredItems(itemsData);
  }, []);

  const handleFilterChange = (filters) => {
    let result = [...itemsData];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply type filter
    const activeTypes = Object.entries(filters.type)
      .filter(([_, isActive]) => isActive)
      .map(([type]) => type);

    if (activeTypes.length > 0) {
      result = result.filter(item => activeTypes.includes(item.type));
    }

    // Apply status filter
    const activeStatuses = Object.entries(filters.status)
      .filter(([_, isActive]) => isActive)
      .map(([status]) => status);

    if (activeStatuses.length > 0) {
      result = result.filter(item => activeStatuses.includes(item.trend));
    }

    // Apply category filter (tab)
    if (activeTab !== 'all') {
      result = result.filter(item => item.category === activeTab);
    }

    // Apply value range filter
    if (filters.valueRange.from && !isNaN(parseInt(filters.valueRange.from))) {
      const minValue = parseInt(filters.valueRange.from);
      result = result.filter(item => item.baseValueNum >= minValue);
    }

    if (filters.valueRange.to && !isNaN(parseInt(filters.valueRange.to))) {
      const maxValue = parseInt(filters.valueRange.to);
      result = result.filter(item => item.baseValueNum <= maxValue);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        // Assuming newer items have higher IDs
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        result = [...result].sort((a, b) => a.id - b.id);
        break;
      case 'valueLowToHigh':
        result = [...result].sort((a, b) => {
          if (a.baseValueNum === null) return 1;
          if (b.baseValueNum === null) return -1;
          return a.baseValueNum - b.baseValueNum;
        });
        break;
      case 'valueHighToLow':
        result = [...result].sort((a, b) => {
          if (a.baseValueNum === null) return 1;
          if (b.baseValueNum === null) return -1;
          return b.baseValueNum - a.baseValueNum;
        });
        break;
      default:
        // By category is the default, keep original order
        break;
    }

    setFilteredItems(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Re-filter items with new active tab
    let result = [...itemsData];

    if (tab !== 'all') {
      result = result.filter(item => item.category === tab);
    }

    setFilteredItems(result);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="page-title">Counter Blox Values</h1>
      <p className="mb-6 text-center text-sm text-gray-400">Most accurate and updated Counter Blox value list</p>

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-1">
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'all' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('all')}
        >
          all
        </button>
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'pistols' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('pistols')}
        >
          Pistols
        </button>
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'rifles' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('rifles')}
        >
          Rifles
        </button>
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'smg' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('smg')}
        >
          SMG
        </button>
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'heavy' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('heavy')}
        >
          Heavy
        </button>
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'knives' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('knives')}
        >
          Knives
        </button>
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'gloves' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('gloves')}
        >
          Gloves
        </button>
        <button
          className={`rounded-md px-3 py-1 text-sm ${activeTab === 'misc' ? 'bg-purple-700 text-white' : 'bg-[#1a1428] text-gray-300 hover:bg-[#291d45]'}`}
          onClick={() => handleTabChange('misc')}
        >
          Misc
        </button>
      </div>

      {/* Filter */}
      <Filter onFilterChange={handleFilterChange} />

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {currentItems.map(item => (
          <ItemCard key={`${item.id}-${item.type}`} item={item} />
        ))}
      </div>

      {/* No results message */}
      {currentItems.length === 0 && (
        <div className="my-8 text-center text-lg text-gray-400">
          No items found matching your search criteria.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex rounded-lg bg-[#1a1428]">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`rounded-l-lg px-3 py-1 ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-white hover:bg-[#291d45]'}`}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, i) => {
              // Only show a few page numbers
              if (
                i === 0 ||
                i === totalPages - 1 ||
                (i >= currentPage - 2 && i <= currentPage + 1)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-purple-700 text-white' : 'text-white hover:bg-[#291d45]'}`}
                  >
                    {i + 1}
                  </button>
                );
              } else if (
                i === currentPage - 3 ||
                i === currentPage + 2
              ) {
                return <span key={i} className="px-1 py-1 text-gray-400">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`rounded-r-lg px-3 py-1 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-500' : 'text-white hover:bg-[#291d45]'}`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValueList;
