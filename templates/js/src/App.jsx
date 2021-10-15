import React, { useEffect, useState } from 'react';
import { useThrottleFn } from '~/hooks/useThrottleFn';
import { DMRemService } from '~/services/dm-rem-service';
import { DMRouter } from '~/routes/router';

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
      <DMRouter />
    </div>
  );
};

export { App };
