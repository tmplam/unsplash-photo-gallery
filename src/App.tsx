import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, Home, PhotoGallery, PhotoDetail, Error } from '@/pages';
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
  return <RouterProvider router={router} />;
}

export default App;
