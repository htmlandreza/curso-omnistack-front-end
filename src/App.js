import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
      // BrowserRouter: o caminho da URL
      // Switch: garante que apenas uma rota seja chamada
      // cada vez que o usuário estiver em um endereço diferente
      // Route: indica cada rota da aplicação
      // Exact: garante que a rota tem que ser realmente aquela da URL,
      // inclui somente na rota raiz
      <BrowserRouter> 
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/timeline' component={Timeline} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
