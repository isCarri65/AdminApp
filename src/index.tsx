import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Store.ts';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);