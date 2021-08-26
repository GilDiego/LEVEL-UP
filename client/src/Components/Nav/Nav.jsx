import React from 'react'
import {Link} from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar.jsx';
import './Nav.css'


export default function Nav() {
    return (
        
        <div className='jumbotron'>
            <Link to='/home'>
            <p className='title'> Videogames</p>
            </Link>

            <Link to='/new'>
            <p className='title'> Create</p>
            </Link>

            <span className='searchbar'><Searchbar /></span>
        </div>
    )
}
