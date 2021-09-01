import React from 'react'
import {Link} from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar.jsx';
import './Nav.css'


export default function Nav() {
    return (
        
        <div className='jumbotron'>
            <div className='nav-text'>
                <Link to='/home'>
                <p className='title'> LEVEL UP</p>
                </Link>
                <Link to='/new'>
                <p className='title2'> Create</p>
                </Link>
            </div>
            

            <span className='searchbar'><Searchbar /></span>
        </div>
    )
}
