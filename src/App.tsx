import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FrontPage } from './platform/FrontPage';
import { WebBackground } from './components/WebBackground';
import store from './store/store';
import { Provider } from 'react-redux';
import { UserLogin } from './platform/UserLogin';
import { Main } from './platform/Main';
import { Scout } from './platform/Scout';
import { Game } from './platform/Game';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <WebBackground>
            <Route path="/" exact>
              <FrontPage />
            </Route>
            <Route path="/login">
              <UserLogin />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/scout">
              <Scout scoutTitle="Hero Scout" cost={250} />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </WebBackground>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
