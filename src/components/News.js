import React, { useState , useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


  const News = (props)=> {

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

   
   const pageSize = 9;

   
    
       

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = `${ capitalizeFirstLetter( props.category)} - NewsHub`;

    useEffect(() => {
      updateNews();
    }, []);
 

    const updateNews= async ()=> {
      props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=${ props.mykey}&pageSize=${pageSize}&page=${page}`;
    let data = await fetch(url);
    props.setProgress(35);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
   
  }

    // const handlePrevBtn = async () => {

    //   setPage(page-1);
    //    updateNews();

    // }
  
    // const handleNextBtn = async () => {

    //   setPage(page+1);
    //    updateNews();

    // }

  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=${ props.mykey}&pageSize=${ pageSize}&page=${ page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(article.concat(parsedData.articles));
 
  }

   
    return (
      <div className='container my-3'>
         
        <h2 className='text-center ' style={{ marginTop: '78px', marginBottom: '1.2rem' }}>NewsHub - Top {`${capitalizeFirstLetter( props.category)}`} headlines </h2>
        { loading && <Spinner/>}


        <InfiniteScroll
          dataLength={ article.length}
          next={ fetchMoreData}
          hasMore={ article.length < totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              { article.map((element,index) => {
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


News.defaultProps = {
  country: "in",
  category: 'general'
    
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}



export default  News 
