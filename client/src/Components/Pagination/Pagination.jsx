import React from 'react'
import { useDispatch } from 'react-redux'
import { getGames } from '../../Redux/Actions/actions'
import './Pagination.css'

export default function Pagination({ postsPerPage, totalPosts, paginate }) {

    const dispatch = useDispatch()

    // Calculates the amount of page numbers to be rendered
    // const pageNumbers = []
    // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    //     pageNumbers.push(i)    
    // }

    const page = []
    for (let i = 1; i <= 10; i++) {
        page.push(i.toString())
        
    }

    
    return (
        <div>
            {/* <ul className="pagination">
            {
                pageNumbers.map(number => (
                        <span 
                            className='page-number' 
                            onClick={(e) => {
                                paginate(number)
                                // current(e)
                                
                            }}
                            href="/home"
                            key={number}>
                            {number}
                        </span>
                ))
            }
            </ul> */}
            {
                page.map(number => (
                    <button
                        onClick={e => dispatch(getGames(number))}>
                        {number}
                    </button>
                ))
            }
        </div>
    )
}
