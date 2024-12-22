import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { postProdectItems } from "network/prodectTrain/prodectTrain";
import { useState } from "react";
import style from "./style.module.css";
export default function ProdectTraning() {
  const [runingTraning, setRunningTraning] = useState(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={style.main}>
        <h5>Prodect Traning</h5>
        {!runingTraning ? (
          <div className={style.message}>Click to Train</div>
        ) : (
          <div className={style.message}>Traning......</div>
        )}
        <div
          className={style.traningButton}
          role="button"
          onClick={() => {
            setRunningTraning(true);
            postProdectItems(({ res }) => {
              if (res.data) {
                setRunningTraning(false);
              }
            });
          }}
        >
          Train
        </div>
      </div>
    </DashboardLayout>
  );
}
