import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error/>,
    children: [{ index: true, path: '/', element: <Home /> },
    { path: 'login', element: <Login /> }
  ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);