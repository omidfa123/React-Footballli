import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/screens/ErrorPage';
import Matches, { loader as matchesLoader } from '@/screens/Matches';
import Navigation from '@/layout/Navigation';
import { routes } from '@/lib/constants/routes';
import Discoveries from '@/screens/Discoveries';
import Soccer from '@/screens/Soccer';
import League from '@/screens/League';
import Profile from '@/screens/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Navigation />,
    children: [
      {
        index: true,
        loader: matchesLoader,
        // action: eventAction,
        element: <Matches />,
      },
      {
        path: routes.discoveries,
        element: <Discoveries />,
      },
      {
        path: routes.soccer,
        element: <Soccer />,
      },
      {
        path: routes.league,
        element: <League />,
      },
      {
        path: routes.profile,
        element: <Profile />,
      },
    ],
  },
]);
