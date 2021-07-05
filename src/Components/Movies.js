import React, { Component } from 'react';
import {getMovies} from './getMovies';

export default class Movies extends Component {
    
    constructor(){
        super();
        this.state={
            movies:getMovies(),
            currSearchText:'',
            currPage:1
        }
    }
    
    onDelete=(id)=>{
        
        let nta=this.state.movies.filter((ele)=>{
            return ele._id!=id
        })
        
        this.setState({
            movies:nta
        })
    }
    
    handleChange=(e)=>{
        let val=e.target.value;
        // console.log(val)
        this.setState({
            currSearchText:val
        })
    
    }
    
    sortByRatings=(e)=>{
        
        let className=e.target.className;
        let  sortedMovies=[]
        
        // console.log(className)
        
        if(className=='fa fa-sort-asc'){
            
             sortedMovies=this.state.movies.sort(function(a,b){
                return a.dailyRentalRate-b.dailyRentalRate;
            })
        }else{
             sortedMovies=this.state.movies.sort(function(a,b){
                return b.dailyRentalRate-a.dailyRentalRate;
            })
        }
        
        this.setState({
            movies:sortedMovies
        })
    }
    
    sortByStock=(e)=>{
        
        let className=e.target.className;
        let  sortedMovies=[]
        
        // console.log(className)
        
        if(className=='fa fa-sort-asc'){
            
             sortedMovies=this.state.movies.sort(function(a,b){
                return a.numberInStock-b.numberInStock;
            })
        }else{
             sortedMovies=this.state.movies.sort(function(a,b){
                return b.numberInStock-a.numberInStock;
            })
        }
        
        this.setState({
            movies:sortedMovies
        })
        
    }
    
    handlePageChange=(pageNumber)=>{
        this.setState({
            currPage:pageNumber
        })
    }
    
    render() {
        
        // console.log(this.state.currSearchText)
        let filteredArr=[];
        let{currSearchText,movies,currPage}=this.state
        let limit=4
        if(currSearchText==''){
            filteredArr=movies
        }else{
            // filteredArr=movies.filter((movieObj)=>{
            //     let title=movieObj.title.toLowerCase()
            //     return title.includes(currSearchText.toLowerCase())
            // })
            filteredArr = movies.filter(function(movieObj) {
                let title = movieObj.title.toLowerCase();
                console.log(title);
                return title.includes(currSearchText.toLowerCase())
            })
        
        }   
        
        let numberofPage = Math.ceil(filteredArr.length / limit);
        let pageNumberArr = [];
        for (let i = 0; i < numberofPage; i++) {
            pageNumberArr.push(i + 1);
        }
        
        let si=(currPage-1)*limit;
        let ei=si+limit
        
        filteredArr=filteredArr.slice(si,ei)
        
    
        return (
            <div className='container'>
                 <div className='row'>
                    <div className='col-3'>Hello</div>
                    <div className='col-9'>
                    <input types="search" value={this.state.currSearchText} onChange={this.handleChange}></input>
                    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">
        <i onClick={this.sortByStock} class="fa fa-sort-asc" aria-hidden="true"></i>
            Stock
            <i onClick={this.sortByStock}  class="fa fa-sort-desc" aria-hidden="true"></i>
            </th>
        <th scope="col">
        <i onClick={this.sortByRatings} class="fa fa-sort-asc"  aria-hidden="true"></i>
            Rate
            <i onClick={this.sortByRatings} class="fa fa-sort-desc" aria-hidden="true"></i>
            </th>
            <th></th>
          
    </tr>
  </thead>
  <tbody>
     {
     
        filteredArr.map((movieObj)=>{
            return(
                <tr scope='row' key={movieObj._id}>
                    <td></td>
                    <td>{movieObj.title}</td>    
                    <td>{movieObj.genre.name}</td>
                    <td>{movieObj.numberInStock}</td>
                    <td>{movieObj.dailyRentalRate}</td>  
                    <td><button type="button" className="btn btn-danger" onClick={()=>{
                        this.onDelete(movieObj._id)
                    }}>Delete</button></td>  
                     
                </tr>
            )
            
        })
     }
  </tbody>
</table>
<ul className="pagination">
    {
        pageNumberArr.map((pageNumber)=>{
            let classStyle=pageNumber == currPage ? 'page-item active' : 'page-item';
            
            return(
                <li key={pageNumber} onClick={() => this.handlePageChange(pageNumber)}
                                                        className={classStyle}><span className="page-link">{pageNumber}</span></li>
            )
        })
    
    }

</ul>


                    
                    </div>
                 </div>
            </div>
        )
    }
}
