import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css'

export default function Card({id, img, name, genres}) {
return (
        <div className="card">
                <div className='card-body'>
                        {<img className='card-img' src={img} alt={name} />  || <p>placeholder img</p>}
                        <Link to={{
                                pathname: '/details',
                                state: {id}
                        }}>
                                <h3>{name}</h3>
                        </Link>
                        <p>{genres}</p>
                        {/* <p>{rating}</p> */}
                </div>
        </div>
)
}
