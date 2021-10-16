import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import React from 'react';
import { routes } from './routes';

const DMRouter = () => {
  return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
};

export { DMRouter };
