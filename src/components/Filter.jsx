import { useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const Filter = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: {
      normal: true,
      st: true
    },
    status: {
      stable: true,
      fluctuating: true,
      rising: true,
      dropping: true
    },
    sortBy: 'byCategory',
    valueRange: {
      from: '',
      to: ''
    }
  });

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearchChange = (e) => {
    const newFilters = {
      ...filters,
      search: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (category, value) => {
    const newFilters = {
      ...filters,
      [category]: {
        ...filters[category],
        [value]: !filters[category][value]
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    const newFilters = {
      ...filters,
      sortBy: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleValueRangeChange = (field, value) => {
    const newFilters = {
      ...filters,
      valueRange: {
        ...filters.valueRange,
        [field]: value
      }
    };
    setFilters(newFilters);
  };

  const applyValueRange = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const newFilters = {
      search: '',
      type: {
        normal: true,
        st: true
      },
      status: {
        stable: true,
        fluctuating: true,
        rising: true,
        dropping: true
      },
      sortBy: 'byCategory',
      valueRange: {
        from: '',
        to: ''
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            className="search-input"
            placeholder="Search items"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="filter-button ml-2"
          onClick={handleFilterToggle}
        >
          <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5" />
          Filter
        </button>
      </div>

      {isFilterOpen && (
        <div className="rounded-lg bg-[#1a1428] p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="filter-section">
              <h3 className="filter-section-title">Type</h3>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.type.normal}
                    onChange={() => handleCheckboxChange('type', 'normal')}
                  />
                  <span className="filter-label">Normal</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.type.st}
                    onChange={() => handleCheckboxChange('type', 'st')}
                  />
                  <span className="filter-label">St</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-section-title">Status</h3>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.status.stable}
                    onChange={() => handleCheckboxChange('status', 'stable')}
                  />
                  <span className="filter-label">Stable</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.status.fluctuating}
                    onChange={() => handleCheckboxChange('status', 'fluctuating')}
                  />
                  <span className="filter-label">Fluctuating</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.status.rising}
                    onChange={() => handleCheckboxChange('status', 'rising')}
                  />
                  <span className="filter-label">Rising</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.status.dropping}
                    onChange={() => handleCheckboxChange('status', 'dropping')}
                  />
                  <span className="filter-label">Dropping</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-section-title">Sort By</h3>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="sort-radio"
                    checked={filters.sortBy === 'byCategory'}
                    onChange={() => handleSortChange('byCategory')}
                  />
                  <span className="filter-label">By Category</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="sort-radio"
                    checked={filters.sortBy === 'newest'}
                    onChange={() => handleSortChange('newest')}
                  />
                  <span className="filter-label">Newest</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="sort-radio"
                    checked={filters.sortBy === 'oldest'}
                    onChange={() => handleSortChange('oldest')}
                  />
                  <span className="filter-label">Oldest</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="sort-radio"
                    checked={filters.sortBy === 'valueLowToHigh'}
                    onChange={() => handleSortChange('valueLowToHigh')}
                  />
                  <span className="filter-label">Value Low to High</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="sort-radio"
                    checked={filters.sortBy === 'valueHighToLow'}
                    onChange={() => handleSortChange('valueHighToLow')}
                  />
                  <span className="filter-label">Value High to Low</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-section-title">Value Range</h3>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <label className="mb-1 block text-xs text-gray-400">From:</label>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="0"
                    value={filters.valueRange.from}
                    onChange={(e) => handleValueRangeChange('from', e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="mb-1 block text-xs text-gray-400">To:</label>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="0"
                    value={filters.valueRange.to}
                    onChange={(e) => handleValueRangeChange('to', e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <button
                  className="rounded bg-gray-700 px-3 py-1 text-xs hover:bg-gray-600"
                  onClick={resetFilters}
                >
                  Reset
                </button>
                <button
                  className="rounded bg-purple-700 px-3 py-1 text-xs hover:bg-purple-600"
                  onClick={applyValueRange}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
