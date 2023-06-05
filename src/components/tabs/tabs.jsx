import "./tabs.scss";

const Tabs = ({ activeTab = 0, tabs, onTabChange, children }) => {
  return (
    <div className="tabs">
      <div className="tabs__links">
        {tabs.map((tab, index) => {
          return (
            <div
              className={`tabs__link ${
                activeTab === index ? "tabs__link--active" : ""
              }`}
              key={`tab_${index}`}
              onClick={() => onTabChange(index)}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="tabs__content">{children}</div>
    </div>
  );
};

export default Tabs;
