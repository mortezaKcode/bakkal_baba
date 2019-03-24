import React from 'react'
import {Route,NavLink} from 'react-router-dom'
import CreateFood from './CreateFood'
import FoodsList from './FoodsList'
import EditFood from './EditFood'
export default class Foods extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      return(
        <div className="container py-3">
          <ul className="nav nav-tabs rtl">
          <li className="nav-item">
            <NavLink to={this.props.match.url + "/List"} className="nav-link" activeClassName="active">Ürün listesi</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to={this.props.match.url + '/create/'} activeClassName="active" className="nav-link">Ürün yapma</NavLink>
            </li>
          </ul>
          <Route path={this.props.match.url + "/create/"} component={CreateFood} />
          <Route path={this.props.match.url + "/list/"} component={FoodsList} />
          <Route path={this.props.match.url + "/edit/:id"} component={EditFood} />
        </div>
      )
    }
  
  }