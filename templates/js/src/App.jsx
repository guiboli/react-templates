import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useThrottleFn } from '~/hooks/useThrottleFn';
import { DMRemService } from '~/services/dm-rem-service';

const App = () => {
  const [htmlFontSize, setHtmlFontSize] = useState(() => {
    return DMRemService.setRem();
  });

  const throttleSetRem = useThrottleFn(
    () => {
      const fontSize = DMRemService.setRem();
      setHtmlFontSize(fontSize);
    },
    1000,
    { trailing: true },
  );

  useEffect(() => {
    window.addEventListener('resize', () => throttleSetRem());
    return () => {
      window.removeEventListener('resize', () => throttleSetRem());
    };
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        {/* <Switch>
            <Route exact={true} path="/">
              <Redirect to="/index" />
            </Route>
            <Route path="/index" component={LoginPage} />
            <Route path="/editor" component={EditorPage} />
          </Switch> */}
      </BrowserRouter>
    </div>
  );
};

export { App };
