import React from 'react'
import $ from 'jquery'
export default class CreateUser extends React.Component{
  constructor(props){
    super(props)
    this.create_order = this.create_order.bind(this)
    this.makeOrder = this.makeOrder.bind(this)
  }
  create_order(e){
    if ( e.key === 'Enter') {
      this.makeOrder()
    }
  }
  makeOrder(){
    let userElement = this.refs.user_name
    let userName = userElement.value.trim()
    let token = $('meta[name="csrf-token"]').attr('content')
    if ( userName === "" ) {
      alert("Mushterinin Adini Yaz Oghlum")
      return
    }
    $.ajax({
      type: "post",
      url: "/createuser",
      data: {name: userName,_csrf_token: token},
      success: function(data){
        let response = JSON.parse(data)
        if ( response.res === "error" ) {
          alert("Olmadi Yine Dene ")
          return 
        }
        this.props.history.push("/orders/createorder/" + response.id +"/" + response.name)
      }.bind(this),error: function(){
        alert("Sorun Var Yine Dene ")
      }
    })
  }
  render(){
    return(
      <div className="container py-3 rtl">
      <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
      <div className="from-group">
      <input onKeyPress={this.create_order} ref="user_name" placeholder="Siparish Verenin Adi"  className="form-control form-control-lg" />
      </div>
      </div>
      <div className="w-100"></div>
      <button onClick={this.makeOrder} className="btn btn-lg btn-outline-success mt-3">Siparishi Bashla</button>
      </div>
      </div>
    )
  }
}