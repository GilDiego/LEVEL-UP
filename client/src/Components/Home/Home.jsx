import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'
import Buttons from '../Buttons/Buttons.jsx'
import Cards from '../Cards/Cards.jsx'
import { fetchDB, getGames } from '../../Redux/Actions/actions.js';


export default function Home() {
    const dispatch = useDispatch()
    const gamesRedux = useSelector(state => state.gamesLoaded)
    const gamesDB = useSelector(state => state.gamesLoaded)

// On component mount, fetches data from API and DB
    useEffect(() => {
        if (!gamesRedux.length) dispatch(getGames())
        if (!gamesDB.length) dispatch(fetchDB())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <>
            <Buttons />
            <Cards />
        </>
    )
}
