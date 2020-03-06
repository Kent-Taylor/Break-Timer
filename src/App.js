import React from "react";
import Timer from "./timer.js";
import Footer from "./footer";
// import Notification from "./notification";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        {/* <Notification /> */}
        <Timer />
        <Footer />
      </div>
    </div>
  );
}
