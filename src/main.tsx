import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import '@arco-design/web-react/dist/css/arco.css';

import CoreMap from './components/map/CoreMap';
import SideBar from './components/SideBar';

function App() {
  const [hoverCoord, setHoverCoord] = useState<any>();

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <CoreMap />
      {/* Sidebar*/}
      <div className="w-[28rem] bg-aero-dark absolute top-0 left-0 bottom-0">
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
