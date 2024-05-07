import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import React, { Component } from 'react'
import NewsComponents from './components/NewsComponents'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  // componentDidMount(){

  //   apiKey = process.env.REACT_APP_NEWS_API;
  // }
  
  apiKey ="df04a98686d64069910400b1f5d89c6d";
  state = {
    progress:0,
  }

  setProgress=(progress)=>{
    this.setState({progress : progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="general" country="in" category="general" />} />
            <Route exact path="/business" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="business" country="in" category="business" />} />
            <Route exact path="/entertainment" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="entertainment" country="in" category="entertainment" />} />
            <Route exact path="/health" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="health" country="in" category="health" />} />
            <Route exact path="/general" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="general" country="in" category="general" />} />
            <Route exact path="/science" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="science" country="in" category="science" />} />
            <Route exact path="/sports" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="sports" country="in" category="sports" />} />
            <Route exact path="/technology" element={<NewsComponents  setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={5} key="technology" country="in" category="technology" />} />
          </Routes>

        </Router>
      </div>
    )
  }
}
