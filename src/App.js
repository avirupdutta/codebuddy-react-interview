import { Toaster } from 'react-hot-toast';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Router from './Router';
import './styles/index.css';

const App = () => (
  <>
    <Router />
    <Toaster />
  </>
);

export default App;
