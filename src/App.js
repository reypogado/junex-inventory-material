import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import CategoryContextProvider from './context/CategoryContext';

//pages
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import { headers } from './utils/utils';

function App() {
  window.$name = 'tester'
  return (
    <AuthContextProvider>
      <CategoryContextProvider>
        <BrowserRouter>
          <Switch >
            <Route exact path="/" component={Login} /> :
            <Route path="/home" component={Home} />
          </Switch >
        </BrowserRouter>
      </CategoryContextProvider>
    </AuthContextProvider>
  );
}

export default App;
