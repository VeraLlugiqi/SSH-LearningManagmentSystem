import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
// import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets";

type Props = {};

const DashboardHero = (props: Props) => {
  return (
    <div>
      <DashboardHeader />
      {
        // isDashboard && (
        //   <DashboardWidgets open={open} />
        // )
      }
    </div>
  );
};

export default DashboardHero;