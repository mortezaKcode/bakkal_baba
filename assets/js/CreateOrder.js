import React from 'react'
import $ from 'jquery'
export default class CreateOrder extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      userID: this.props.match.params.id,
      userName: this.props.match.params.name,
      foods: [],
      orders: [],
      allPrice: 0
    }
    this.addFood = this.addFood.bind(this)
    this.reduceFood = this.reduceFood.bind(this)
    this.calculatePrice = this.calculatePrice.bind(this)
    this.buildOrder = this.buildOrder.bind(this)
    this.makeFactor = this.makeFactor.bind(this)
  }
  makeFactor(divId) {
    var content = document.getElementById(divId).innerHTML;
    var mywindow = window.open('', 'Print', 'height=600,width=800');

    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus()
    mywindow.print();
    mywindow.close();
    return true;
}
  buildOrder(e){
    let token = $('meta[name="csrf-token"]').attr('content')
    $.ajax({
      type: "post",
      url: "/makeorder",
      data: {
        _csrf_token: token,
        userId: this.state.userID,
        userName: this.state.userName,
        orders: this.state.orders
      },
      success: function(data){
        if ( data.res === "error" ) {
          alert(data.msg)
          return
        }
        if ( data.res === "ok" ) {
          let mywindow = window.open("","Print","height=300,width=300")
          mywindow.document.open()
          //e.target.style.visibility ='hidden'
          let elem = this.refs.btn
          elem.style.visibility = 'hidden'
          let s = document.getElementById('factor').innerHTML
          elem.style.visibility = 'visible'
          mywindow.document.write(s)
          mywindow.close
          this.props.history.push("/orders/createuser")
        }
      }.bind(this),error: function(){
        alert("Olmadi yeniden dene :(")
      }
    })
  }
  reduceFood(e){
    let span = document.getElementById("span" + e.id)
    let searchFood = this.state.orders.filter(function(x){
      return x.id == e.id
    })
    if (searchFood.length === 0 ) {
      alert("Bu Ürün Sechilmemish ")
      return 
    }
    let deleteFood = this.state.orders.filter((x) => {
      return x.id != e.id
    })
    let oldCount = searchFood[0].count
    if ( oldCount === 1) {
      this.setState({
        orders: deleteFood
      },() => {
        this.calculatePrice()
      })
      span.innerText = 0
      return
    }
    let newCount = oldCount - 1
    span.innerText = newCount
    e.count = newCount
    this.setState({
      orders: deleteFood.concat(e)
    },(x) => {
      this.calculatePrice()
    })
  }
  addFood(e){
    let span = document.getElementById("span" + e.id)
    let res = this.state.orders.filter(function(x){
      return x.id == e.id
    })
    if ( res.length === 0 ) {
      e.count = 1
      this.setState({
        orders: this.state.orders.concat(e)
      },(x) => {
        this.calculatePrice()
      })
      span.innerText = e.count
      return
    }else{
      let res2 = this.state.orders.filter(function(x){
        return x.id != e.id
      })
      let newFood = e
      newFood.count = res[0].count + 1
      this.setState({
        orders: res2.concat(newFood)
      },(x) => {
        this.calculatePrice()
      })
      span.innerText = newFood.count
    }
    window.e = this.state
  }
  calculatePrice(){
    var allPriceCalculate = 0.0
    for(let i = 0 ; i < this.state.orders.length ; i++ ) {
      var price = this.state.orders[i].price
      var count = this.state.orders[i].count
      var sum = price * count
      allPriceCalculate += sum
    }
    this.setState({
      allPrice: allPriceCalculate
    })
  }
  componentDidMount(){
    this.getFoods()
  }
  getFoods(){
    $.ajax({
      type: "GET",
      url: "/getfoods",
      data: {},
      success: function(data){
        let foods = JSON.parse(data)
        this.setState({
          foods: foods
        })
      }.bind(this),error: function(){
        alert("Olmadi yeniden dene lan :(")
      }
    })
  }
  render(){
    return(
      <div className="container py-3 rtl">
      <div className="row">
          <div className="col col-12 col-md-8 col-sm-8 list-group">
            {this.state.foods.map((val,key) => {
              return(
                <li key={key} className="list-group-item list-group-item-action pointer">
                <div className="row">
                <div className="col">{val.name}</div>
                <div className="col">
                <span id={"span" + val.id} className="badge badge-warning">0</span>
                </div>
                <button onClick={function() {this.addFood(val)}.bind(this)} className="col btn btn-outline-primary mr-1">
                  Artir 
                </button>
                <button onClick ={function() {this.reduceFood(val)}.bind(this)} className="col btn btn-outline-danger">
                 Azalt
                </button>
                </div>
                </li>
              )
            })}
          </div>
          <div className="col-sm" id="factor">
          <div className="row justify-content-center mt-1">
          <h1>Kontiner</h1>
          </div>
          <div className="row justify-content-center">
          <p><span>Mushteri Adi  : </span><span>{this.state.userName}</span></p>
          </div>
          <div className="row justify-content-center">
          <p><span>Fiyat:</span><span>{this.state.allPrice}</span><span> Tl</span></p>
          </div>
          <div className="row justify-content-center">
          <button ref="btn" className="btn btn-outline-success" onClick={this.buildOrder}>Sipariş ver </button>
          </div>
          </div>
        </div>
      </div>
    )
  }
}