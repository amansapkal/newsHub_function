 
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
   
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  
  mykey = process.env.REACT_APP_MY_API_KEY;

  state = {
    progress : 50
  }

  setProgress = (value) =>{
      this.setState({ progress : value })
  }


  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
        
         />
            <Navbar/>
        
        <Routes>
              <Route exact  path="/" element={<News setProgress = {this.setProgress} mykey ={this.mykey} key="general1" country="us"  category='general' />}/>
              <Route exact  path="/business" element={<News  setProgress = {this.setProgress} mykey ={this.mykey} key="business" country="us"  category='business' />}/>
              <Route exact  path="/entertainment" element={<News  setProgress = {this.setProgress} mykey ={this.mykey} key="entertainment" country="us"  category='entertainment' />}/>
              <Route exact  path="/general" element={<News  setProgress = {this.setProgress} mykey ={this.mykey} key="general2" country="us"  category='general' />}/>
              <Route exact  path="/health" element={<News  setProgress = {this.setProgress} mykey ={this.mykey} key="health" country="us"  category='health' />}/>
              <Route exact  path="/science" element={<News  setProgress = {this.setProgress} mykey ={this.mykey} key="science" country="us"  category='science' />}/>
              <Route exact  path="/sports" element={<News  setProgress = {this.setProgress} mykey ={this.mykey} key="sports" country="us"  category='sports' />}/>
              <Route exact  path="/technology" element={<News  setProgress = {this.setProgress} mykey ={this.mykey} key="technology" country="us"  category='technology' />}/>
            </Routes>
        </Router>

      </div>
    )
  }
}

