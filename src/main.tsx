import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import CoreMap from './components/map/CoreMap';
import SideBar from './components/SideBar';

function App() {
  const [hoverCoord, setHoverCoord] = useState<any>();

  return (
    <div className="w-screen h-screen relative overflow-hidden z-10">
      <CoreMap />
      {/* Sidebar + Controllers (Right Bottom) */}
      <div className="w-screen h-screen pointer-events-none flex flex-row absolute top-0 left-0">
        <div className="w-[28rem] bg-aero-dark">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
