import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {ContainerComponent} from 'efficomps';
import Example from './Example';

const App = () => {
  return (
    <div>
    <ContainerComponent
        leftColumn={(
            <ul className="navbar-nav flex-grow">
                <li>Example</li>
            </ul>

        )}
    >
    <BrowserRouter>
      <Route exact path='/' component={Example} />
      </BrowserRouter>
      </ContainerComponent>
    </div>
  )
  }

export default App;