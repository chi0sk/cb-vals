import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import itemsData from '../data/items';
import ItemCard from '../components/ItemCard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);

  useEffect(() => {
    // Find the item by ID
    const foundItem = itemsData.find(item => item.id === parseInt(id));

    if (foundItem) {
      setItem(foundItem);

      // Find similar items (same category)
      const similar = itemsData
        .filter(i =>
          i.id !== foundItem.id &&
          i.category === foundItem.category
        )
        .slice(0, 5); // Get up to 5 similar items

      setSimilarItems(similar);
    }
  }, [id]);

  if (!item) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-xl text-gray-400">Loading item details...</p>
      </div>
    );
  }

  // Format item name for display
  const formatItemName = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length < 2) return name;

    const capitalized = parts.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return capitalized;
  };

  // Mock chart data (in a real app, this would come from the API)
  const chartData = {
    labels: ['Jul 30', 'Aug 03', 'Jun 13', 'Jul 31', 'Aug 09', 'Aug 09'],
    datasets: [
      {
        fill: true,
        label: 'Value History',
        data: item.baseValueNum ?
          [
            item.baseValueNum * 0.98,
            item.baseValueNum * 0.9,
            item.baseValueNum * 1.1,
            item.baseValueNum * 0.97,
            item.baseValueNum * 1.05,
            item.baseValueNum,
          ] :
          [0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(168, 42, 230)',
        backgroundColor: 'rgba(168, 42, 230, 0.3)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: '#291d45',
        },
        ticks: {
          color: '#e0dde5',
        },
      },
      x: {
        grid: {
          color: '#291d45',
        },
        ticks: {
          color: '#e0dde5',
        },
      },
    },
  };

  return (
    <div className="mb-12">
      {/* Trade Ads button */}
      <div className="mb-4 flex justify-end">
        <Link
          to={`/items/${item.name.replace(/\s+/g, '-')}/${item.id}`}
          className="flex items-center rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 9C7.88071 9 9 7.88071 9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 20C18.8807 20 20 18.8807 20 17.5C20 16.1193 18.8807 15 17.5 15C16.1193 15 15 16.1193 15 17.5C15 18.8807 16.1193 20 17.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Trade Ads
        </Link>
      </div>

      {/* Item Details Card */}
      <div className="rounded-lg bg-[#1a1428] p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Item Image */}
          <div className="flex items-center justify-center">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="max-h-64 w-auto object-contain"
            />
          </div>

          {/* Item Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block rounded-md bg-[#0e0b18] px-3 py-1 text-xs uppercase text-white">
                {item.type}
              </span>
              <h1 className="mt-2 text-2xl font-bold text-white">
                {formatItemName(item.name)}
              </h1>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-md bg-[#291d45] p-3">
                <span className="font-medium uppercase text-gray-300">Base Value</span>
                <span className="text-white">{item.baseValue}</span>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[#291d45] p-3">
                <span className="font-medium uppercase text-gray-300">rares</span>
                <span className="text-white">{item.rares}</span>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[#291d45] p-3">
                <span className="font-medium uppercase text-gray-300">mids</span>
                <span className="text-white">{item.mids}</span>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[#291d45] p-3">
                <span className="font-medium uppercase text-gray-300">trend</span>
                <span className={`uppercase ${
                  item.trend === 'rising' ? 'text-green-500' :
                  item.trend === 'dropping' ? 'text-red-500' :
                  item.trend === 'fluctuating' ? 'text-orange-500' :
                  'text-blue-500'
                }`}>{item.trend}</span>
              </div>

              <div className="flex items-center justify-between rounded-md bg-[#291d45] p-3">
                <span className="font-medium uppercase text-gray-300">status</span>
                <span className="uppercase text-white">{item.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Item Details - Additional */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md bg-[#291d45] p-3">
            <span className="font-medium uppercase text-gray-300">case</span>
            <span className="ml-4 uppercase text-white">{item.case}</span>
          </div>

          <div className="rounded-md bg-[#291d45] p-3">
            <span className="font-medium uppercase text-gray-300">type</span>
            <span className="ml-4 uppercase text-white">{item.type}</span>
          </div>
        </div>
      </div>

      {/* Value Chart */}
      <div className="mt-6 rounded-lg bg-[#1a1428] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Chart</h2>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Similar Items */}
      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold">
          <span className="text-purple-500">Similar</span> Items
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {similarItems.map(item => (
            <ItemCard key={`${item.id}-${item.type}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
