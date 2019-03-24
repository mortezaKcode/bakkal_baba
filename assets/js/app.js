// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"
// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//

import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
import $ from  'jquery/dist/jquery'
import 'popper.js'
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css'
import  'bootstrap-v4-rtl/dist/js/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import {Route,HashRouter} from 'react-router-dom'
import Header from './header'
import Foods from './Foods'
import Orders from './Orders'
const App = () => {
  return (
    <div>
      <Header />
      <Route path="/foods" component={Foods} />
      <Route path="/orders" component={Orders} />
    </div>
  )
}


// let token = $('meta[name="csrf-token"]').attr('content')

ReactDOM.render(
  <HashRouter><App /></HashRouter>
  ,document.getElementById('app')
)