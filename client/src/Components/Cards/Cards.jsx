import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import './Cards.css'
import Card from '../Card/Card.jsx'

export default function Cards() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const gamesRedux = useSelector(state => state.gamesLoaded)
    const gamesDB = useSelector(state => state.gamesDB)


    // When data from redux is stored, concats data if there are multiple sources
    useEffect(() => {
        if (gamesRedux.length && gamesDB.length) setData(gamesDB.concat(gamesRedux))
        else if (gamesRedux.length && !gamesDB.length) setData(gamesRedux)
    },[gamesRedux, gamesDB])

    useEffect(() => {
        if (data.length) setLoading(false)
    },[data])

    // sets ID for API or DB data
    function chooseId(idAPI, idDB){
        if (idDB) return idDB
        else return idAPI
    }

    // Pagination
    let index = 0

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
                            data.map(game => <Card
                                index = {++index}
                                key={chooseId(game.id, game.idDB)}
                                id={chooseId(game.id, game.idDB)}
                                img={game.image}
                                name={game.name}
                                // genres={game.genres.map(genre => <p> {genre} </p>) || game.genres}
                                genres={game.genres}
                            />)
                            }
                        </div>
                    </>
                )
            }
            
        </>
    )
}
