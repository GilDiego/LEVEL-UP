import React, {useState, useEffect}from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { searchId } from '../../Redux/Actions/actions';
import './Details.css'


export default function Details() {
    const [loading, setLoading] = useState(true)
    const [game, setGame] = useState({})

    // React location hook
    const location = useLocation()
    const { id } = location.state

    const dispatch = useDispatch()
    const gameObject = useSelector(state => state.gamesReducer.gameObject)
    const gamesDB = useSelector(state => state.gamesReducer.gamesDB)

    useEffect(() => {
        if (typeof id !== 'string') dispatch(searchId(id))
        else {
            let arr = gamesDB
            arr = arr.filter(el => el.idDB === id)
            setGame(arr[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if (gameObject.id === id) setGame(gameObject)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gameObject])

    useEffect(() => {
        if (game.id === id || game.idDB === id) setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[game])

    return (
        <>
            {
                loading ? (
                            <div>Loading</div>
                        ) : (
                        <>
                            <h1>{game.name}</h1>
                            <p>{game.image}</p>
                            {game.genres.map(genre => <span>{genre} </span>)}
                            <p>{game.release}</p>
                            <p>{game.rating}</p>
                            {game.platforms.map(platform => <span>{platform} </span>)}
                            <p>{game.description}</p>
                        </>
                        )
            }
        </>
    )
}
