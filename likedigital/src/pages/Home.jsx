import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Event from "./Event";
import Problem from "./Problem";
import Guide from "./Guide";
import MostQusetion from "./MostQuestion";

export default function Home() {
  return (
    <>
      <Header />
      <Event />
      <Problem />
      <Guide />
      <MostQusetion />
    </>
  );
}
