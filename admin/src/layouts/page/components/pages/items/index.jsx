import { useState } from "react";
import CoffeeItems from "./coffee/coffee";
import ItemsTab, { tabItemsName } from "./components/tab/tab";
import TeaItems from "./tea";
export default function Items() {
  const [activeTab, setActiveTab] = useState(tabItemsName.TEA);
  return (
    <div>
      <ItemsTab
        active={activeTab}
        onClick={(active) => {
          setActiveTab(active);
        }}
      />

      {activeTab == tabItemsName.TEA ? <TeaItems /> : <CoffeeItems />}
    </div>
  );
}
