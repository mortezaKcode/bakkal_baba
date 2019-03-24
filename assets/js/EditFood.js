import React from 'react'
import $ from 'jquery'
export default class EditFood extends React.Component{
  constructor(props){
    super(props)
    this.edit_food = this.edit_food.bind(this)
    this.state = {
      updated: false
    }
  }
  componentDidMount(){
    let id = this.props.match.params.id
    $.get("/getfood",{id: id},function(data){
      let name = JSON.parse(data)
      if ( name !=null) {
        this.refs.txt.value = name.name
        this.refs.price.value = name.price
        this.refs.txt.id = name.id
      }
    }.bind(this)) 
  }
  edit_food(){
    let token = $('meta[name="csrf-token"]').attr('content')
    let txt = this.refs.txt
    let price = this.refs.price
    let val =txt.value.trim()
    let priceVal = price.value.trim()
    if ( val === "" ) {alert("Adini Yaz");return}
    $.ajax({
      type: "post",
      url: "/updatefood",
      data: {_csrf_token: token,name: txt.value,id: txt.id,price: priceVal},
      success: function(data){
        let response = JSON.parse(data)
        if ( response.res == "ok" ){
          this.props.history.goBack()
        }else{
          alert("Olmadi yine dene ")
        }
      }.bind(this),
      error: function(){
        alert("Update olmadi yine dene ")
      }
    })
  }
  render(){
    return(
      <div className="container py-3">
      <div className="row justify-content-center rtl">
      <div className="col-md-4">
      <div className="form-group">
      <input ref="txt" type="text" className="form-control form-control-lg" />
      </div>
      </div>
      <div className="w-100"></div>
      <div className="col-md-4">
      <div className="form-group">
      <input ref="price" type="text" className="form-control form-control-lg" />
      </div>
      </div>
      <div className="w-100"></div>
      <button onClick={this.edit_food} className="btn btn-outline-warning btn-lg mr-5">düzenle</button>
      <button onClick={function(){ this.props.history.goBack() }.bind(this)} className="btn btn-outline-info btn-lg">Rev. önceki sayfa</button>
      </div>
      </div>
    )
  }
}