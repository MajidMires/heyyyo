import React from 'react';
import { CustomizationProvider } from './context/CustomizationContext';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';

function App() {
  return (
    <CustomizationProvider>
      <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
        <div className="w-full lg:w-96 h-full overflow-auto border-r border-gray-200 bg-white">
          <Sidebar />
        </div>
        <div className="flex-1 h-full overflow-hidden bg-gray-100">
          <Preview />
        </div>
      </div>
    </CustomizationProvider>
  );
}

export default App;