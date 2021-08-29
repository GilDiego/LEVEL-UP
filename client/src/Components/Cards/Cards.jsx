import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import './Cards.css'
import Pagination from '../Pagination/Pagination.jsx'
import Card from '../Card/Card.jsx'
import { filterAPI, filterDB, filterAlphabetically, filterByRating } from './functions';

export default function Cards() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [display, setDisplay] = useState([])
    // const [finalDisplay, setFinalDisplay] = useState([])
    // const [page, setPage] = useState(1)
    // const [postsPerPage] = useState(10)
    
    const gamesRedux = useSelector(state => state.gamesReducer.gamesLoaded)
    const gamesDB = useSelector(state => state.gamesReducer.gamesDB)
    const resultsRedux = useSelector(state => state.gamesReducer.gamesSeached)
    const srcs = useSelector(state => state.buttonsReducer.sources)
    const options = useSelector(state => state.buttonsReducer.optionsSelected)

    // When data from redux is stored, concats data if there are multiple sources
    useEffect(() => {
        if (gamesRedux.length && gamesDB.length) setData(gamesDB.concat(gamesRedux))
        else if (gamesRedux.length && !gamesDB.length) setData(gamesRedux)
    },[gamesRedux, gamesDB])

    useEffect(() => {
        if (resultsRedux.length) setDisplay(resultsRedux)
        else setDisplay(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, resultsRedux])

    useEffect(() => {
        if (display.length) setLoading(false)
    },[display])
    
    useEffect(() =>{


        let array = data
        array = filterAPI(array, srcs, gamesRedux)
        array = filterDB(array, srcs, gamesDB)
        array = filterAlphabetically(array, options)
        array = filterByRating(array, options)
        setDisplay(array)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[srcs, options])
    // sets ID for API or DB data
    // function chooseId(idAPI, idDB){
    //     if (idDB) return idDB
    //     else return idAPI
    // }
    //Sets value of final display following pagination rules
    // useEffect(() => {
    //     const indexOfLastPost = page * postsPerPage
    //     const indexOfFirstPost = indexOfLastPost - postsPerPage
    //     setFinalDisplay(display.slice(indexOfFirstPost, indexOfLastPost))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[display, page])

    // Pagination
    let index = 0
    // // Change page
    // const paginate = (pageNumber) => setPage(pageNumber)


    return (
        <>
            {
                (loading) ? (
                    <div>
                    {/* <img src={loadingGif} alt="loading" /> */}
                    <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className='cards'>
                            {
                            display.map(game => <Card
                                index = {++index}
                                key={game.idDB ? game.idDB : game.id}
                                id={game.idDB ? game.idDB : game.id}
                                img={game.image}
                                name={game.name}
                                // genres={game.genres.map(genre => <p> {genre} </p>) || game.genres}
                                genres={game.genres}
                                // rating ={game.rating}
                            />)
                            }
                        </div>
                            <Pagination 
                            // postsPerPage={postsPerPage} 
                            // totalPosts={display.length} 
                            // paginate={paginate}
                            />
                    </>
                )
            }
            
        </>
    )
}
