import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { searchGames } from '../../Redux/Actions/actions';
import './Searchbar.css'

export default function Searchbar() {
    const [results, setResults] = useState('')

    const dispatch = useDispatch()

    function handleChange(e){
        setResults(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchGames(results))
    }

    function clearSearch(){
        setResults('')
    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>

                <input 
                    type="text" 
                    placeholder="Search for games..."
                    onChange={e => handleChange(e)}
                    value={results}
                />
                <input type="submit" value='Search'/>
                <button onClick={e => clearSearch()}>Clear</button>

            </form>
        </>
    )
}
