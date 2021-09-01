import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { searchGames } from '../../Redux/Actions/actions';
import { setLoading } from '../../Redux/Actions/buttonsActions'
import './Searchbar.css'

export default function Searchbar() {
    const [results, setResults] = useState('')

    const dispatch = useDispatch()

    function handleChange(e){
        setResults(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(setLoading(true))
        dispatch(searchGames(results))
    }

    function clearSearch(){
        setResults('')
    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>

                <button className="fas fa-search" type="submit"/>
                &nbsp;
                <input 
                    className='search'
                    type="text" 
                    placeholder="Search for games..."
                    onChange={e => handleChange(e)}
                    value={results}
                />
                &nbsp;
                <button className="fas fa-times-circle" onClick={e => clearSearch()} />

            </form>
        </>
    )
}
