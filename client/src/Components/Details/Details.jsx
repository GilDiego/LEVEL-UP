import React, {useState, useEffect}from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { searchId } from '../../Redux/Actions/actions';
import './Details.css'
import placeholder from '../../Media/placeholder.png'
import loadingGif from '../../Media/loading3.gif'
import {setLoading} from '../../Redux/Actions/buttonsActions.js'


export default function Details() {
    const [game, setGame] = useState({})

    // React location hook
    const location = useLocation()
    const { id } = location.state

    const dispatch = useDispatch()
    const gameObject = useSelector(state => state.gamesReducer.gameObject)
    const gamesDB = useSelector(state => state.gamesReducer.gamesDB)
    const loading = useSelector(state => state.buttonsReducer.loading)

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
        if (game.id === id || game.idDB === id) dispatch(setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[game])

    function splitPlatforms(string){
        string.replace()
    }
    return (
        <>
            {
                loading ? (
                            <div>
                                <img src={loadingGif} alt="loadingGif" />
                                <p>Loading...</p> 
                            </div>
                        ) : (
                        <div className='details'>
                                {game.image ? <img className='game-image' src={game.image} alt={game.name} /> : <img className='game-image' src={placeholder} alt={game.name}/>}
                                <div className='details-right'>
                                <h1>{game.name}</h1> 
                                <p>
                                <b>Genres:</b>  
                                {game.genres.map(genre => <span>  {genre} </span>)}
                                </p>
                                <p><b>Release date:  </b>{game.release}</p>
                                <p><b>Rating:  </b>{game.rating}</p>
                                <p>
                                <b>Platforms:  </b>
                                {Array.isArray(game.plaforms) ? game.platforms.map(platform => <span>{platform}&nbsp;</span>) : <p>{game.platforms.toString().split(/(?=[A-Z])/)}</p>}
                                </p>
                                <div>
                                <b>Description:</b> <br />
                                <p className='desc'>{game.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                                </div>
                                </div>
                        </div>
                        )
            }
        </>
    )
}
