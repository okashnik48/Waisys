import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";

import CookPanel from "../Cook/CookPanel"
import Modalfr from "../Modalfr";
import CookMenu from "../Cook/CookMenu"

const Coocker = () => {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="LoginForm" element={<Modalfr />} />
  
        <Route path="CookPanel" element={<CookPanel />} />
  
        <Route path="*" element={<CookPanel />} />
        
      </Routes>
      <CookMenu />
      </BrowserRouter>
    );
  };
  export default Coocker;