import React, { Component } from 'react';
import {getMovies} from './getMovies';

export default class Movies extends Component {
    
    constructor(){
        super();
        this.state={
            movies:getMovies(),
            currSearchText:''
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
    
    
    
    render() {
        
        // console.log(this.state.currSearchText)
        let filteredArr=[];
        let{currSearchText,movies}=this.state
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
        <i class="fa fa-sort-asc" aria-hidden="true"></i>
            Stock
            <i class="fa fa-sort-desc" aria-hidden="true"></i>
            </th>
        <th scope="col">
        <i class="fa fa-sort-asc" aria-hidden="true"></i>
            Rate
            <i class="fa fa-sort-desc" aria-hidden="true"></i>
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
                    
                    </div>
                 </div>
            </div>
        )
    }
}
