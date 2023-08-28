import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import './App.css';
import Header from './Components/Header';
import AllRoutes from './Components/AllRoutes';


const App = () => {
  
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <ToastContainer/>
      </BrowserRouter>
      <AllRoutes/>
    </div>
  );
};

export default App;
