import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import { router } from './Routes/Router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: 'yellow',
            color: 'red',
          },
        }}
      />
    </div>
  );
}

export default App;
