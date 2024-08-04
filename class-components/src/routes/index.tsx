import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTES } from '../config';
import MainPage from '../components/main-page/MainPage';
import NotFoundPage from '../components/not-found-page/NotFoundPage';
import RootLayout from '../layouts/root-layout';

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: APP_ROUTES.HOME, element: <MainPage /> },
      { path: APP_ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);
