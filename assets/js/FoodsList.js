import React from 'react'
import $ from 'jquery'
export default class FoodsList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      foods: [],
      curser: 0,
      count: 0,
      showDelete: false,
      deleteID: 0
    }
    this.paginate = this.paginate.bind(this)
    this.editFood = this.editFood.bind(this)
    this.showDelete = this.showDelete.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
    this.deleteFood = this.deleteFood.bind(this)
  }
  toggleDelete(){
    this.setState({
      showDelete: !this.state.showDelete
    })
  }
  showDelete(e){
    let id = e.target.value
    this.setState({
      deleteID: id
    })
    this.toggleDelete()
  }
  deleteFood(id){
    let token = $('meta[name="csrf-token"]').attr('content')
    let foodID = id 
    this.setState({
      deleteID: 0
    })
    $.ajax({
      type: "post",
      url: "/deletefood",
      data: {_csrf_token: token,id: foodID},
      success: function(data){
        let response = JSON.parse(data)
        alert(response.msg)
        this.getFood()
        return
      }.bind(this),error: function(){
        alert("It oghlu it oghlu server chalishmiyor yine dene")
      }
    })
  }
  editFood(e){
    let foodId = e.target.value
    this.props.history.push("/foods/edit/"+foodId)
  }
  paginate(e){
    let id = e.target.textContent
    let id2 = (id * 5) -5
    this.setState({
      curser: id2
    })
    this.getFood()
  }
  getFoodCount(){
    $.get("/foodscount",{},function(data){
      let count = JSON.parse(data)
      this.setState({
        count: count
      })
    }.bind(this))
  }
  getFood(){
    $.ajax({
      type: "get",
      url: "/foods",
      data: {curser: this.state.curser},
      success: function(data) {
        let foods = JSON.parse(data)
        this.setState({
          foods: foods
        })
      }.bind(this)
    })
  }
  componentDidMount(){
    this.getFoodCount()
    this.getFood()
  }
  render(){
    return(
      <div>
        {this.state.showDelete ? <DeleteConfirm toggleDelete={this.toggleDelete} deleteFood={this.deleteFood} foodID = {this.state.deleteID} /> : null}
      <div className="rtl">
      <table className="table table-hover rtl mt-3">
      <tbody>
        {this.state.foods.map((val,key) => {
          return(
            <tr key={key}>
            <td>{val.name}</td>
            <td>{val.price}</td>
            <td><button value={val.id} className="btn btn-outline-primary" onClick={this.editFood}>Şimdi düzenle</button></td>
            <td><button value={val.id} onClick={this.showDelete} className="btn btn-outline-danger">Sil</button></td>
            </tr>
          )
        })}
      </tbody>
      </table>
      <nav aria-label="Page navigation ">
  <ul className="pagination justify-content-center">
    {Array(Math.ceil(this.state.count/5)).fill(1).map((v,key) => {
      return(
        <li key={key} className={(key)== this.state.curser/5 ? "page-item active" : "page-item"}>
        <button className="page-link" onClick={this.paginate}>{key+1}</button>
        </li>
      )
    })}
    </ul>
    </nav>
      </div></div>
    )
  }
}
const DeleteConfirm = (props) => {
    return (
      <div className="modal_layout" onClick={props.toggleDelete}>
      <div className="modal_inside">
      <p className="rtl">Oğlumu temizlemek ister misin?</p>
      <button onClick={() => {props.deleteFood(props.foodID)}}  className="btn btn-lg btn-outline-danger mr-3 mb-3">Evet</button>
      <button onClick={props.toggleDelete} className="btn btn-lg btn-outline-secondary mb-3">Hayir istemem baba</button>
      </div>
      </div>
    )
  }