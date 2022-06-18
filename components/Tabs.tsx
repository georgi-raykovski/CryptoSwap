import { tabsStyles } from "./styles";

interface ITabsProps {
  tabClickHandler: (tabName: string) => void;
  activeTab: string;
  tabsArray: string[];
}

const Tabs = ({ tabClickHandler, tabsArray, activeTab }: ITabsProps) => {
  return (
    <div className={tabsStyles.tabsContainer}>
      <ul className={tabsStyles.tabList}>
        {tabsArray.map((tab, index) => (
          <li key={index} className="mr-2">
            <a
              href="#"
              className={`${tabsStyles.tabItem} ${tab === activeTab ? tabsStyles.tabActive : ""}`}
              onClick={() => tabClickHandler(tab)}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
