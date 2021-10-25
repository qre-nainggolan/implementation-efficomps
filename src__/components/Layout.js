import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { ContainerComponent } from 'efficomps';
import './CollaboratorComponent.css';

export default props => (
  <div>
    <ContainerComponent
        leftColumn={(
            <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/transaksiTimbangMuat">Transaksi</NavLink>
                </NavItem>
            </ul>
        )}
    >
    </ContainerComponent>
  </div>
);
