import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css'
import { useDispatch } from 'react-redux'
import {setLoading} from '../../Redux/Actions/buttonsActions.js'

export default function Card({id, img, name, genres}) {

    const dispatch = useDispatch()

return (
        <div className="card">
                <div className='card-body'>
                        {<img className='card-img' src={img} alt={name} />  || <p>placeholder img</p>}
                        <Link to={{
                                pathname: '/details',
                                state: {id}
                        }}>
                                <h3 onClick={e => dispatch(setLoading(true))}>{name}</h3>
                        </Link>
                        <p>{genres}</p>
                        {/* <p>{rating}</p> */}
                </div>
        </div>
)
}
