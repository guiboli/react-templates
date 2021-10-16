import { renderRoutes, RouteConfig } from 'react-router-config';
import { Home } from '~/widgets/Home';
import { HelloWorld } from '~/widgets/HelloWorld';

const Root = ({ route }: any) => {
  return renderRoutes(route.routes);
};

const routes: RouteConfig[] = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/hello-world',
        component: HelloWorld,
      },
    ],
  },
];

export { routes };
