import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import 'antd/dist/reset.css'; 
import '@ant-design/v5-patch-for-react-19'; 

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
