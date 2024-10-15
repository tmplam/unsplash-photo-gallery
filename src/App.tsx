import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout, Home, PhotoGallery, PhotoDetail, Error } from '@/pages';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'photos',
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <PhotoGallery />,
          },
          {
            path: ':photoId',
            element: <PhotoDetail />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
