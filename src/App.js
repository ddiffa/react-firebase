import React, { Component } from 'react';
import {database} from "./firebase.js";
import './App.css';
import List from "./List.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:null,
      newQuestion: ''
    };

    this.dbRef = null;
  }
  componentDidMount(){
    this.dbRef = database.ref("/questions");

    this.dbRef.on("value", (snapshot)=>{
      this.setState({
        data: snapshot.val()
      });

      console.log("data changed..", snapshot.val());
    });
  }

  handleDownVote = (event, questions, key) => {
    event.preventDefault();
    const {title, upvote , downvote } = questions;
    this.dbRef.child(key).set({
      title:title,
      upvote:upvote,
      downvote: downvote + 1
    })
  }

  handleUpVote = (event, questions, key) =>{
    event.preventDefault();
    const {title, upvote , downvote } = questions;
    this.dbRef.child(key).set({
      title: title,
      upvote: upvote + 1,
      downvote: downvote
    });
  }

  handleChange = (event) => {
    const newQuestion = event.target.value;
    this.setState({
      newQuestion: newQuestion
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.dbRef.push({title:this.state.newQuestion, upvote: 0, downvote: 0});
  }

  render(){
    return (
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={this.handleSubmit}>
          <input className="border rounded shadow py-2 px-2 dx-3 mx-3" type="text" onChange={this.handleChange} placeholder=" Title "/>

          <button className = "bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded"type="submit"> Save </button>
        </form>

        {this.state.data ? <List 
        questions={this.state.data} 
        handleUpVote={this.handleUpVote} 
        handleDownVote={this.handleDownVote}/> : <h2 className="py-4 px-4">Loading...</h2>}
      </div>
    );
  }
}

export default App;
