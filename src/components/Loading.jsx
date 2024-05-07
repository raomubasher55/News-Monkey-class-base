import React, { Component } from 'react'
import Spinner from './loading.gif'
export default class Loading extends Component {
  render() {
    return (
        <div className="d-flex justify-content-center align-items-center ">
        <img className='my-3' src={Spinner} alt="loading" />
      </div>
      
    )
  }
}
