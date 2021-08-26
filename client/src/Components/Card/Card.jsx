import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css'

export default function Card({id, img, name, genres}) {
return (
        <div className="card">
                <div>{img || <p>placeholder img</p>}</div>
                <Link to={{
                        pathname: '/details',
                        state: {id}
                }}>
                        <h3>{name}</h3>
                </Link>
                <p>{genres}</p>
        </div>
)
}
