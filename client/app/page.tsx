"use client";
import REact, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import FirstIntro from "./components/Route/FirstIntro";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,Engineering,Machine Learning"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <FirstIntro />
    </div>
  );
};

export default Page;
