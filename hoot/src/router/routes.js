// src/router/routes.js
import HootFeedPage from '../pages/HootFeedPage/HootFeedPage';

export const routes = Object.freeze([
  {
    Component: HootFeedPage,
    key: 'hoots',
    path: '/hoots',
    label: 'Feed', // optional metadata; AppRouter will ignore it
  },
]);

export default routes;
