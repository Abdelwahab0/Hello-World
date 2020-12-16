import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/authRoute';

import { MenuBar } from './components';
import { Home, Login, Register } from './pages/';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider> 
  );
}

export default App;
