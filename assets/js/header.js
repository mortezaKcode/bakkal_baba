import React from 'react'
import {NavLink} from 'react-router-dom'
export default class Header extends React.Component{


    render(){
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Kontiner</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="rtl collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
        <NavLink to="/foods" activeClassName="active" className="nav-link">Ürün yönetimi</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/orders" activeClassName="active" className="nav-link"> Sipariş yönetimi</NavLink>
        </li>
        </ul>
        </div>
        </nav>
        )
    }
}