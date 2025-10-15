type RipplesTabsProps = {
  activeTabKey: string;
  onTabChange: (key: string) => void;
};

const tabs = [
  { key: 'all', label: 'Ripples' },
  { key: 'mine', label: 'My Posts' },
];

export const RipplesTabs = ({ activeTabKey, onTabChange }: RipplesTabsProps) => (
  <nav className="flex border-b border-gray-300 mb-4">
    {tabs.map(tab => (
      <button
        key={tab.key}
        onClick={() => onTabChange(tab.key)}
        className={`px-4 py-2 -mb-px font-semibold transition-colors border-b-4 ${
          activeTabKey === tab.key
            ? 'border-green-500 text-green-600'
            : 'border-transparent text-gray-600 hover:text-green-500'
        }`}
        aria-current={activeTabKey === tab.key ? 'page' : undefined}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);
