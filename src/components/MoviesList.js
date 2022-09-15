import React, { Component } from "react";
// import { movies } from "../moviesData";
import axios from "axios"

export class MoviesList extends Component {
  constructor() {
    super();
    this.state = {
      hover: " ",
      pArr: [1],
      movies : [],
      currPage :1,
      favourites :[]
    };
  }

  async componentDidMount(){
    let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fad33b2d89cc8628b46d81696eb117b1&language=en-US&page=${this.state.currPage}`)
    let moviesData = res.data 
    console.log(moviesData)
    this.setState({
      movies : [...moviesData.results]
    })
  }
  
  // function to change the page data & no on next click 
  changeMovies = async() =>{
    let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fad33b2d89cc8628b46d81696eb117b1&language=en-US&page=${this.state.currPage}`)
    let moviesData = res.data 
    console.log(moviesData)
    this.setState({
      movies : [...moviesData.results]
    })
  }

  handlenext=()=>{
         let temparr= []
         for(let i=1;i<=this.state.pArr.length+1;i++){
          temparr.push(i)
         }
         this.setState({
          pArr : [...temparr],
          currPage : this.state.currPage+1,
         }, this.changeMovies)//callback bhja hai change movies ko
  }
  handlePrevious=()=>{
    if(this.state.currPage!=1){
      this.setState({
        currPage : this.state.currPage-1
      }, this.changeMovies)
    }
  }
  handlePageClick=(value)=>{
        if(value!=this.state.currPage){
          this.setState({
            currPage : value 
          },this.changeMovies)
        }
  }
  handlefavourite=(moviesObj)=>{
    let oldData =JSON.parse(localStorage.getItem("movies-app" )|| '[]')
    if(this.state.favourites.includes(moviesObj.id)){
                oldData=oldData.filter((movie)=> movie.id != moviesObj.id)
    }
    else{
          oldData.push(moviesObj)
    }

    localStorage.setItem("movies-app" ,JSON.stringify(oldData))
    console.log(oldData)
    this.handlefavouriteStates()
  }
  handlefavouriteStates=()=>{
    let oldData =JSON.parse(localStorage.getItem("movies-app" )|| '[]')
    let tempData = oldData.map((movie)=> movie.id)

    this.setState({
      favourites : [...tempData]
    })
  }

  render() {
    // let movieArr = movies.results;
    return (
      <>
        <div>
          <h3 className="text-center">
            <strong>Trending</strong>
          </h3>
        </div>
        <div className="movies-list">
          {this.state.movies.map((movieElem) => (
            <div
              className="card movie-card"
              onMouseEnter={() => this.setState({ hover: movieElem.id })}
              onMouseLeave={() => this.setState({ hover: " " })}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}
                style={{ height: "40vh", width: "20vw" }}
                className="card-img-top movie-img"
                alt="..."
              />
              <h5 className="card-title movie-title">{movieElem.title}</h5>
              <div>
                {this.state.hover == movieElem.id && (
                  <a  className="btn btn-primary favbtn"
                  onClick={()=> this.handlefavourite(movieElem)}>
                    {this.state.favourites.includes(movieElem.id)? " Remove to Favourite" :" Add to Favourite" } 
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handlePrevious}>
                  Previous
                </a>
              </li>
              {this.state.pArr.map((value) => (
                <li className="page-item">
                  <a className="page-link" onClick={()=>this.handlePageClick(value)}>
                    {value}
                  </a>
                </li>
              ))}

              <li class="page-item">
                <a class="page-link" onClick={this.handlenext}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default MoviesList;
