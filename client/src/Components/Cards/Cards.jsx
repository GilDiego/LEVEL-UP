import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cards.css';
import Pagination from '../Pagination/Pagination.jsx';
import Card from '../Card/Card.jsx';
import { filterAPI, filterDB, filterAlphabetically, filterByRating } from './functions';
import loadingGif from '../../Media/loading3.gif';
import placeholder from '../../Media/placeholder.png';
import { fetchDB, getGames } from '../../Redux/Actions/actions.js';
import { setLoading } from '../../Redux/Actions/buttonsActions.js';
export default function Cards() {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  const dispatch = useDispatch();
  const gamesRedux = useSelector((state) => state.gamesReducer.gamesLoaded);
  const gamesDB = useSelector((state) => state.gamesReducer.gamesDB);
  const resultsRedux = useSelector((state) => state.gamesReducer.gamesSeached);
  const srcs = useSelector((state) => state.buttonsReducer.sources);
  const options = useSelector((state) => state.buttonsReducer.optionsSelected);
  const pageSelected = useSelector((state) => state.buttonsReducer.pageSelected);
  const loading = useSelector((state) => state.buttonsReducer.loading);
  useEffect(() => {
    if (!gamesRedux.length) dispatch(getGames(1));
    if (!gamesDB.length) dispatch(fetchDB());
  }, []);
  useEffect(() => {
    if (gamesRedux.length && gamesDB.length && pageSelected >= 2) setData(gamesRedux);
    else if (gamesRedux.length && gamesDB.length && pageSelected === 1) {
      setData(gamesDB.concat(gamesRedux));
    } else if (gamesRedux.length && !gamesDB.length) setData(gamesRedux);
  }, [gamesRedux, gamesDB, pageSelected]);
  useEffect(() => {
    if (resultsRedux.length) setDisplay(resultsRedux);
    else setDisplay(data);
  }, [data, resultsRedux]);
  useEffect(() => {
    if (display.length === 10 || resultsRedux.length) dispatch(setLoading(false));
  }, [display, resultsRedux]);
  useEffect(() => {
    const isSearch = resultsRedux.length > 0;
    let games = isSearch ? resultsRedux : data;
    games = filterAPI(games, srcs, isSearch ? resultsRedux : gamesRedux);
    games = filterDB(games, srcs, gamesDB);
    games = filterAlphabetically(games, options);
    games = filterByRating(games, options);
    setDisplay(games);
  }, [data, resultsRedux, gamesDB, srcs, options]);
  function chooseID(idDB, id) {
    return idDB ? idDB : id;
  }
  let index = 0;
  return (
    <>
      {loading ? (
        <div>
          <img src={loadingGif} alt="loading" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="cards">
            {display.map((game) => (
              <Card
                index={++index}
                key={chooseID(game.idDB, game.id)}
                id={chooseID(game.idDB, game.id)}
                img={game.image ? game.image : placeholder}
                name={game.name}
                genres={game.genres.join().replaceAll(',', ' ')}
              />
            ))}
          </div>
          {resultsRedux.length ? <span className="none" /> : <Pagination />}
        </>
      )}
    </>
  );
}
