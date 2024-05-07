// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from '../app/Store';
import Location from '../pages/search/Search';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Location />
    </Provider>
  );
};

export default App;
