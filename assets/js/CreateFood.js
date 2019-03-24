import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
export default class CreateFood extends React.Component{
    constructor(props){
      super(props)
      this.addFood = this.addFood.bind(this)
      this.state = {
        errors: []
      }
    }
    addFood(e){
      let errors = this.state.errors
      let foodElement = this.refs.food_name
      let foodPriceElement = this.refs.food_price
      let foodValue = foodElement.value.trim()
      let foodPrice = foodPriceElement.value.trim()
      this.setState({
        errors: []
      })
      foodElement.value = ""
      foodPriceElement.value = ""
      let token = $('meta[name="csrf-token"]').attr('content')
      $.ajax({
        url: "createfood/",
        type: "POST",
        data: {_csrf_token: token,name: foodValue,price: foodPrice},
        success: (data) => {
          alert(data)
        },
        error: function(a,b){
          this.setState({
            errors: this.state.errors.concat("Yeniden Dene")
          })
        }.bind(this)
      })
    }
    render(){
      return(
        <div className="container py-3">
        {this.state.errors.map((val,key) => {
          return(
          <div key={key} className="row justify-content-center">
            <div className="col-md-6">
          <div className="rtl alert alert-danger">{val}</div>
          </div>
          </div>
          )
        })}
      <div className="pt-3 pb-3 rtl row justify-content-center mt-2">
        <div className="form-group col-md-6 col-sm-8 col-lg-4">
        <input ref="food_name" placeholder="Ürün Adi" className="form-control form-control-lg" />
        </div>
        <div className="w-100"></div>
        <div className="form-group col-md-6 col-sm-8 col-lg-4" >
        <input ref="food_price" placeholder="Ürün Fiyati" className="form-control form-control-lg" />
        </div>
        <div className="w-100"></div>
        <button onClick={this.addFood} className="btn btn-lg btn-outline-success">Ürün icad et</button>
        </div>
      </div>
      )
    }
  }