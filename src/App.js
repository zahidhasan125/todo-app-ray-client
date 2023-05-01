import { Toaster } from 'react-hot-toast';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes/Routes';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
