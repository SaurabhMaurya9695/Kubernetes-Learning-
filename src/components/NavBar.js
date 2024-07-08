import React, { Component } from 'react'

import{Link} from "react-router-dom"

export class NavBar extends Component {
  render() {
    return (
      
      <div  style={{display : "flex" }}>
        <Link to="/" style={{fontFamily:"cursive",color:"#30336b"}}><h1>TrendingMovies</h1></Link>
        {/* <Link to= "/favourites" style={{textDecoration : "none"}}><h2 style={{marginLeft : "2rem",marginTop : "0.3rem",fontFamily:"cursive",color:"#192a56"}}>Favourites</h2></Link> */}
      </div>
    )
  }
}

export default NavBar 