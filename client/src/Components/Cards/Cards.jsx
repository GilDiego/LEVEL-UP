import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './Cards.css'
import Pagination from '../Pagination/Pagination.jsx'
import Card from '../Card/Card.jsx'
import { filterAPI, filterDB, filterAlphabetically, filterByRating } from './functions';
import loadingGif from '../../Media/loading3.gif'
import placeholder from '../../Media/placeholder.png'
import { fetchDB, getGames } from '../../Redux/Actions/actions.js';
import {setLoading} from '../../Redux/Actions/buttonsActions.js'

export default function Cards() {
    const [data, setData] = useState([])
    const [display, setDisplay] = useState([])
    
    const dispatch = useDispatch()
    const gamesRedux = useSelector(state => state.gamesReducer.gamesLoaded)
    const gamesDB = useSelector(state => state.gamesReducer.gamesDB)
    const resultsRedux = useSelector(state => state.gamesReducer.gamesSeached)
    const srcs = useSelector(state => state.buttonsReducer.sources)
    const options = useSelector(state => state.buttonsReducer.optionsSelected)
    const pageSelected = useSelector(state => state.buttonsReducer.pageSelected)
    const loading = useSelector(state => state.buttonsReducer.loading)


    // On component mount, fetches data from API and DB
    useEffect(() => {
        if (!gamesRedux.length) dispatch(getGames(1))
        if (!gamesDB.length) dispatch(fetchDB())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    // When data from redux is stored, concats data if there are multiple sources
    useEffect(() => {
        if (gamesRedux.length && gamesDB.length && pageSelected >= 2) setData(gamesRedux)
        else if (gamesRedux.length && gamesDB.length && pageSelected == 1) {
            gamesRedux.slice(-gamesDB.length)
            setData(gamesDB.concat(gamesRedux))
        }
        else if (gamesRedux.length && !gamesDB.length) setData(gamesRedux)
    },[gamesRedux, gamesDB, pageSelected])

    useEffect(() => {
        if (resultsRedux.length) setDisplay(resultsRedux)
        else setDisplay(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, resultsRedux])

    useEffect(() => {
        if (display.length === 10 || resultsRedux.length) dispatch(setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[display, resultsRedux])
    
    useEffect(() =>{
        if (resultsRedux.length) {
            let array = resultsRedux
            array = filterAPI(array, srcs, resultsRedux)
            array = filterDB(array, srcs, gamesDB)
            array = filterAlphabetically(array, options)
            array = filterByRating(array, options)
            setDisplay(array)
        }
        else {
            let array = data
            array = filterAPI(array, srcs, gamesRedux)
            array = filterDB(array, srcs, gamesDB)
            array = filterAlphabetically(array, options)
            array = filterByRating(array, options)
            setDisplay(array)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, resultsRedux, gamesDB, srcs, options])

    function chooseID(idDB, id){
        return idDB ? idDB : id
    }
    // Pagination
    let index = 0
    
    return (
        <>
            {
                (loading) ? (
                    <div>
                    <img src={loadingGif} alt="loading" />
                    <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className='cards'>
                            {
                                display.map(game => <Card
                                    index = {++index}
                                    key={chooseID(game.idDB, game.id)}
                                    id={chooseID(game.idDB, game.id)}
                                    img={game.image ? game.image : placeholder}
                                    name={game.name}
                                    genres={game.genres.join().replaceAll(',', ' ')}
                                // rating ={game.rating}
                            />)
                            }
                        </div>
                        {resultsRedux.length? <span className='none'/> : <Pagination/>}
                    </>
                )
            }
            
        </>
    )
}
