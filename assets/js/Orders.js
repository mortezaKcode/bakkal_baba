import {NavLink,Route} from 'react-router-dom'
import React from 'react'
import CreateUser from './CreateUser'
import CreateOrder from './CreateOrder'
export default class Orders extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
      <ul className="nav nav-tabs rtl mt-1">
      <li className="nav-item">
      <NavLink to="/orders/createuser" className="nav-link" activeClassName="active" >Siparişi kaydıt et</NavLink>
      </li>
      </ul>
      <Route path={this.props.match.url + "/createuser"} component={CreateUser} />
      <Route path={this.props.match.url + "/createorder/:id/:name"} component={CreateOrder} />
      </div>
    )
  }
}