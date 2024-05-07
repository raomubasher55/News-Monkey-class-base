import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card my-3"  >
          <div style={{display : 'flex' , justifyContent:'flex-end', position:'absolute' , right: 0}}>
            <span className=" badge rounded-pill bg-danger">{source}<span className="visually-hidden">unread messages</span></span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">By {!author ? "Unknow" : author} on {new Date(date).toGMTString().slice(0, 16)}</small>
          </div>
        </div>
      </div>
    )
  }
}
