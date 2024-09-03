import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import '@arco-design/web-react/dist/css/arco.css';

import CoreMap from './components/map/CoreMap';
import SideBar from './components/SideBar';
import Header from './components/Header';

function App() {
  const [hoverCoord, setHoverCoord] = useState<any>();

  return (
    <div className="w-screen h-screen relative overflow-hidden flex flex-col">
      <CoreMap />
      <Header />
      <div className="sideBar">
        <SideBar />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
