import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const getChangeColor = (change) => {
    if (!change || change === 'N/A') return 'text-gray-400';
    return change.startsWith('-') ? 'text-red-500' : 'text-green-500';
  };

  const formatItemName = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length < 2) return name;

    // Capitalize first word (usually weapon type)
    const weaponType = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    // Capitalize remaining words (skin name)
    const skinName = parts.slice(1).map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return `${weaponType} ${skinName}`;
  };

  return (
    <Link to={`/items/${item.name.replace(/\s+/g, '-')}/${item.id}`} className="block">
      <div className="item-card">
        <div className="overlay"></div>
        <div className="item-card-content">
          <div className="mb-3 flex justify-between">
            <span className="item-type-badge uppercase">
              {item.type}
            </span>
          </div>

          <div className="mb-3 flex items-center justify-center">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-28 w-28 object-contain"
            />
          </div>

          <h3 className="item-name text-center">
            {formatItemName(item.name)}
          </h3>

          <div className="item-stats">
            <div className="item-stat">
              <span className="item-stat-label">Base Value</span>
              <span className="item-stat-value">{item.baseValue}</span>
            </div>

            <div className="item-stat">
              <span className="item-stat-label">Rares</span>
              <span className="item-stat-value">
                {item.rares}
              </span>
            </div>

            <div className="item-stat">
              <span className="item-stat-label">Recent Changes</span>
              <span className={`item-stat-value ${getChangeColor(item.recentChanges)}`}>
                {item.recentChanges !== 'N/A' ? item.recentChanges : 'N/A'}
              </span>
            </div>

            <div className="item-stat">
              <span className="item-stat-label">Last Updated</span>
              <span className="item-stat-value">{item.lastUpdated}</span>
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <button className="rounded bg-[#291d45] px-2 py-1 text-xs hover:bg-[#3d2a63]">
              OFFER
            </button>
            <button className="rounded bg-[#291d45] px-2 py-1 text-xs hover:bg-[#3d2a63]">
              REQUEST
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
