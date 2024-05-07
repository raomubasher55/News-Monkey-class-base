import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class NewsComponents extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'

  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      category: 'general',
      author: " ",
      totalResults: 0
    }
    document.title = `  ${this.capitalize(this.props.category)} - NewsMonkey`
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async newsUpdate(pageNo) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(40);
    let res = await data.json();
    console.log(res);
    this.setState({ article: res.articles, totalResults: res.totalResults, loading: false })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.newsUpdate(this.state.page);
  }

  handleNextBtn = async () => {

    this.newsUpdate(this.setState({ page: this.state.page + 1 }))
  }
  handlePreBtn = async () => {
    this.newsUpdate(this.setState({ page: this.state.page - 1 }))
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let res = await data.json();
    this.setState({ article: this.state.article.concat(res.articles), totalResults: res.totalResults, loading: false })
  };
  render() {
    return (
      <>
        <h1 className='text-center my-3'>{this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
              {this.state.article.map((e) => (
                e.urlToImage != null ?
                  (<div key={e.url} className="col-md-4">
                    <NewsItem title={e.title ? e.title.slice(0, 45) : ""}
                      description={e.description ? e.description.slice(0, 88) : "" || "No description here"}
                      imageUrl={e.urlToImage}
                      newsUrl={e.url}
                      author={e.author}   
                      date={e.publishedAt}
                      source={e.source.name}
                    />
                  </div>) : null
              ))}
            </div>


            {/* yeh next or previous buttons hain old app waly */}
            {/* <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreBtn}>&larr; Previous</button>
              <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button>
            </div> */}


          </div>
        </InfiniteScroll>
      </>
    );
  }

}  