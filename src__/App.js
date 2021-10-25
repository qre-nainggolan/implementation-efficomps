import './App.css';
import React from 'react';
import { ContainerComponent } from 'efficomps';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
function App() {
  return (
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
}

export default App;
