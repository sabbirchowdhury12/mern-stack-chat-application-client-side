import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import { router } from './Routes/Router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
