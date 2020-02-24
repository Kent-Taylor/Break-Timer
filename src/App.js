import React from "react";
import Timer from "./timer.js";
import Footer from "./footer";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Timer />
        <Footer />
      </div>
    </div>
  );
}
