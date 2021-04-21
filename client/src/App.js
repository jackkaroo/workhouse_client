import React from 'react';
import Routing from './routing/index';
import './styles/App.css';
import './styles/Modal.css';
import './styles/Queries.css';
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);

export default App;
