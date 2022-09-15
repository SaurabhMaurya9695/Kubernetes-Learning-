import React, { Component } from "react";
import { movies } from "../moviesData";

export class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currgenre: ["All genres"],
      movies: [],
      currText : '',
    };
  }
  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || []);
    let tempArr = [];
    data.map((moviesObj) => {
      if (!tempArr.includes(genreids[moviesObj.genre_ids[0]])){
        tempArr.push(genreids[moviesObj.genre_ids[0]]);
      }
  });
    tempArr.unshift("All genres");

    this.setState({
      movies: [...data],
      genres: [...tempArr],
    });
  }
  handleGenreChange=(genre)=>{
    this.setState({
      currgenre : genre
    })
  }
  sortPopularityDesc=()=>{
    let temp=this.state.movies
    temp.sort(function(objA,objB){
    return objB.popularity-objA.popularity
    })
    this.setState({
      movies :[...temp]
    })
  }
  
  sortPopularityAsce=()=>{
    let temp=this.state.movies
    temp.sort(function(objA,objB){
    return objA.popularity-objB.popularity
    })
    this.setState({
      movies :[...temp]
    })
  }
  sortRatingDesc=()=>{
    let temp=this.state.movies
    temp.sort(function(objA,objB){
    return objB.vote_average-objA.vote_average
    })
    this.setState({
      movies :[...temp]
    })
  }
  sortRatingAsce=()=>{
    let temp=this.state.movies
    temp.sort(function(objA,objB){
    return objA.vote_average-objB.vote_average
    })
    this.setState({
      movies :[...temp]
    })
  }
  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterArr =[]

    if(this.state.currText ===""){
      filterArr=this.state.movies
    }
    else{
      filterArr=this.state.movies.filter((movieObj)=>{
        let title=movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase().trim())
      })
    }
    
    if(this.state.currgenre !== "All genres"){
      filterArr=this.state.movies.filter((movieObj)=> genreids[movieObj.genre_ids[0]]== this.state.currgenre)
    }
    return (
      <div className="main">
        <div className="row">
          <div className="col-3">
            <ul class="list-group genre">
              {this.state.genres.map((genre) =>
                this.state.currgenre == genre ? (
                  <li
                    style={{ background: "#ffda79", color: "white" }}
                    class="list-group-item"
                  >
                    {genre}
                  </li>
                ) : (
                  <li class="list-group-item" onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                )
              )}
            </ul>
          </div>
          <div className="col-9 search">
            <div className="row">
              <input
                type="text"
                placeholder="Search"
                className="input-group-text col"
                value={this.state.currText} onChange={(e)=>this.setState({currText : e.target.value})}
              ></input>
              <input
                type="number"
                placeholder="0"
                className="input-group-text col"
              ></input>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col"><i class="fa-solid fa-sort-up"onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down"onClick={this.sortPopularityAsce}></i></th>
                  <th scope="col"><i class="fa-solid fa-sort-up"onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down"onClick={this.sortRatingAsce}></i></th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                {filterArr.map((moviesElem) => (
                  <tr>
                    <th scope="row">
                      <img
                        src={`https://image.tmdb.org/t/p/original${moviesElem.backdrop_path}`}
                        class="card-img-top titlepic"
                        alt="..."
                      />
                      {moviesElem.title}
                    </th>
                    <td>{genreids[moviesElem.genre_ids[0]]}</td>
                    <td>{moviesElem.popularity}</td>
                    <td>{moviesElem.vote_average}</td>
                    <td>
                      <button type="button" class="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Favourites;
