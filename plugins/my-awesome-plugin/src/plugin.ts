import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myAwesomePluginPlugin = createPlugin({
  id: 'my-awesome-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const MyAwesomePluginPage = myAwesomePluginPlugin.provide(
  createRoutableExtension({
    name: 'MyAwesomePluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
