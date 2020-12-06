import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contexts from './context/Contexts';

//pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import { headers } from './utils/utils';

function App() {
  window.$name = 'tester'
  return (
    <Contexts>
      <BrowserRouter>
        <Switch >
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/home" component={Home} />
        </Switch >
      </BrowserRouter>
    </Contexts>

  );
}

export default App;
