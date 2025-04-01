import { useState } from 'react';
import Filter from '../components/Filter';
import ItemCard from '../components/ItemCard';
import itemsData from '../data/items';

const Calculator = () => {
  const [filteredItems, setFilteredItems] = useState(itemsData);
  const [offerItems, setOfferItems] = useState([]);
  const [requestItems, setRequestItems] = useState([]);

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
  };

  const addToOffer = (item) => {
    setOfferItems([...offerItems, { ...item, key: Date.now() }]);
  };

  const addToRequest = (item) => {
    setRequestItems([...requestItems, { ...item, key: Date.now() }]);
  };

  const removeFromOffer = (key) => {
    setOfferItems(offerItems.filter(item => item.key !== key));
  };

  const removeFromRequest = (key) => {
    setRequestItems(requestItems.filter(item => item.key !== key));
  };

  // Calculate total values
  const calculateTotalValue = (items) => {
    return items.reduce((total, item) => {
      const value = item.baseValueNum || 0;
      return total + value;
    }, 0);
  };

  const calculateTotalRares = (items) => {
    return items.reduce((total, item) => {
      const rares = item.raresNum || 0;
      return total + rares;
    }, 0);
  };

  const calculateTotalMids = (items) => {
    return items.reduce((total, item) => {
      const mids = item.midsNum || 0;
      return total + mids;
    }, 0);
  };

  const offerTotalValue = calculateTotalValue(offerItems);
  const offerTotalRares = calculateTotalRares(offerItems);
  const offerTotalMids = calculateTotalMids(offerItems);

  const requestTotalValue = calculateTotalValue(requestItems);
  const requestTotalRares = calculateTotalRares(requestItems);
  const requestTotalMids = calculateTotalMids(requestItems);

  // Format large numbers
  const formatValue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div>
      <h1 className="page-title">Calculator</h1>

      {/* Calculator Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="calculator-section">
          <h2 className="calculator-title">OFFER</h2>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {/* Offer Slots */}
            {[...Array(4)].map((_, index) => {
              const item = offerItems[index];

              return (
                <div key={index} className="item-slot">
                  {item ? (
                    <div className="relative h-full w-full">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="mx-auto h-full w-auto max-w-full object-contain"
                      />
                      <button
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                        onClick={() => removeFromOffer(item.key)}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-500">
                      +
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between border-b border-[#291d45] pb-1">
              <span className="text-gray-400">Base Value</span>
              <span className="font-semibold">{formatValue(offerTotalValue)}</span>
            </div>
            <div className="flex justify-between border-b border-[#291d45] pb-1">
              <span className="text-gray-400">Rares</span>
              <span className="font-semibold">{formatValue(offerTotalRares)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mids</span>
              <span className="font-semibold">{formatValue(offerTotalMids)}</span>
            </div>
          </div>
        </div>

        <div className="calculator-section">
          <h2 className="calculator-title">REQUEST</h2>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {/* Request Slots */}
            {[...Array(4)].map((_, index) => {
              const item = requestItems[index];

              return (
                <div key={index} className="item-slot">
                  {item ? (
                    <div className="relative h-full w-full">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="mx-auto h-full w-auto max-w-full object-contain"
                      />
                      <button
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                        onClick={() => removeFromRequest(item.key)}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-500">
                      +
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between border-b border-[#291d45] pb-1">
              <span className="text-gray-400">Base Value</span>
              <span className="font-semibold">{formatValue(requestTotalValue)}</span>
            </div>
            <div className="flex justify-between border-b border-[#291d45] pb-1">
              <span className="text-gray-400">Rares</span>
              <span className="font-semibold">{formatValue(requestTotalRares)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mids</span>
              <span className="font-semibold">{formatValue(requestTotalMids)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mt-8">
        <Filter onFilterChange={handleFilterChange} />
      </div>

      {/* Items Grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map(item => (
          <div key={`${item.id}-${item.type}`} className="relative">
            <div className="mb-2">
              <ItemCard item={item} />
            </div>
            <div className="absolute bottom-16 left-0 right-0 flex justify-between px-2">
              <button
                className="rounded bg-[#291d45] px-2 py-1 text-xs hover:bg-[#3d2a63]"
                onClick={() => addToOffer(item)}
              >
                OFFER
              </button>
              <button
                className="rounded bg-[#291d45] px-2 py-1 text-xs hover:bg-[#3d2a63]"
                onClick={() => addToRequest(item)}
              >
                REQUEST
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
