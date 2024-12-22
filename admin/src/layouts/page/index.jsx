import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import TabPage from "./components/pages/page";
import PageTab from "./components/tab/tab";
const tabItem = {
  HOME: "HOME",
  ABOUT: "ABOUT",
  SERVICE: "SERVICE",
  BLOG: "BLOG",
  CONTACT: "CONTACT",
  ITEMS: "ITEMS",
};
export default function Page(params) {
  const [activetab, setActiveTab] = useState(tabItem.HOME);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PageTab
        active={activetab}
        onClick={(active) => {
          setActiveTab(active);
        }}
      />
      <TabPage active={activetab} />
    </DashboardLayout>
  );
}
export { tabItem };
