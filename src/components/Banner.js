import React, { Component } from 'react'
// import {movies} from"../moviesData"
import axios from 'axios';
import { movies } from '../moviesData';


export class Banner extends Component {
  constructor(){
    super();
    this.state={
      movies :[]
    
    }
  }

    async componentDidMount(){
      let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fad33b2d89cc8628b46d81696eb117b1&language=en-US&page=${this.state.currPage}`)
      let moviesData = res.data 
      this.setState({
        movies : [...moviesData.results]
      })
     
    }
   
  render() {
    // let movieElem=movies.results[Math.floor((Math.random() * 10))]
    // let backdrop =movieElem.backdrop_path
    return (
      
      <div className="card banner-card">
     {this.state.movies.map((movieElem) => (
    <div>
      <img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} class="card-img-top banner-img" alt="..."/>
      <h5 className="card-title banner-title">{movieElem.title}</h5>
        <p className="card-text">{movieElem.release_date}</p>
    </div>
       ))}
        <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
   
    )
  }
}
// export class Banner extends Component {
//   render() {
//     let movieArr=movies.results
//     return (
//     <>
//       <div className='banner-list'>{
//         movieArr.map((movieElem) =>(
//           <div className="card banner-card">
//           <img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}  class="card-img-top banner-img" alt="..."/>
//           <h5 className="card-title movie-title">{movieElem.title}</h5>
//           <a href="#" className="btn btn-primary">Go somewhere</a>
//         </div>
//         ))
//       }

//       </div>
//     </>
//     )
//   }
// }

export default Banner