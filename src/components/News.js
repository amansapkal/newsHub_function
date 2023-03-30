import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

  static defaultProps = {
    country: "in",
    category: 'general'
      
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

   
  pageSize = 9;

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults: 0
    }

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHub`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    this.props.setProgress(10);

    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.mykey}&pageSize=${this.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    this.props.setProgress(35)
    let parsedData = await data.json();

    this.props.setProgress(60);

    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });

    this.props.setProgress(100);

  }

  async updateNews() {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.mykey}&pageSize=${this.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });

  }

  handlePrevBtn = async () => {

    this.setState({ page: this.state.page - 1 });
    this.updateNews();

  }


  handleNextBtn = async () => {

    this.setState({ page: this.state.page + 1 });
    this.updateNews();

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.mykey}&pageSize=${this.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ article: this.state.article.concat(parsedData.articles) });

  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center ' style={{ marginTop: '16px', marginBottom: '2.2rem' }}>NewsHub - Top {`${this.capitalizeFirstLetter(this.props.category)}`} headlines </h2>
        {this.state.loading && <Spinner/>}


        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {this.state.article.map((element,index) => {
                return <div className='col-md-4' key={index}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://images.hindustantimes.com/tech/img/2023/03/24/1600x900/cae429b44dbf585f8628cfe0ad0d2713jpg_1639967196749_1679626944727_1679626944727.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })

              }
            </div>
          </div>
        </InfiniteScroll>






        

      </div>
    )
  }
}
