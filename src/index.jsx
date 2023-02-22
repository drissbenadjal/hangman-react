import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css';

//page
import { Home } from './pages/Home'

//context
import { LangContextProvider } from './useContext/langContext';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />
  ])
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LangContextProvider>
      <RouterProvider router={router} />
    </LangContextProvider>
  </React.StrictMode>
);
