import React, { Component } from 'react';
import './App.css';
import WeekContainer from './WeekContainer';
import Server from '../public/index'
const App = () => {

  return (
    <div className="App">
      <Server />
      <WeekContainer />
    </div>
  )
}
export default App;