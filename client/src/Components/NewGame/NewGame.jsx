import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewGame.css';
import success from '../../Media/success.gif';
import { API_URL } from '../../config';
import { validateGame, toggleValue } from './validate';

const EMPTY_FORM = {
  name: '',
  description: '',
  release: '',
  rating: '',
  genres: [],
  platforms: '',
  image: 'img',
};

export default function NewGame() {
  const [editing, setEditing] = useState(true);
  const [input, setInput] = useState(EMPTY_FORM);

  function handleInputChange(e) {
    const { type, name, value, checked, parentNode } = e.target;

    if (type !== 'checkbox') {
      setInput((prev) => ({ ...prev, [name]: value }));
    } else if (parentNode.id === 'genres') {
      setInput((prev) => ({ ...prev, genres: toggleValue(prev.genres, value, checked) }));
    } else if (parentNode.id === 'platforms') {
      setInput((prev) => ({
        ...prev,
        platforms: toggleValue(prev.platforms.split(' ').filter(Boolean), name, checked).join(' '),
      }));
    }
  }

  async function submitForm(e) {
    e.preventDefault();

    const errors = validateGame(input);
    if (Object.keys(errors).length) return alert(Object.values(errors).join('\n'));

    await fetch(`${API_URL}/new`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(input),
    });

    setEditing(false);
    setInput(EMPTY_FORM);
  }

  return editing ? (
    <div className="creation-main">
      <h1> Creation Studio </h1>
      <form>
        <div>
          <label className="element">Name:</label>
          <input
            className="field"
            type="text"
            size="10"
            name="name"
            placeholder="Destiny 3"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <br />

        <div>
          <label className="element">Release:</label>
          <input
            className="field"
            type="date"
            size="10"
            name="release"
            placeholder="YYYY-MM-DD"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <br />

        <div>
          <label className="element">Rating:</label>
          <input
            className="field"
            type="number"
            min="1"
            max="5"
            size="10"
            name="rating"
            placeholder="1 to 5"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <br />

        <div>
          <label className="element">Genres:</label>
          <div id="genres">
            <label htmlFor="Action">Action</label>
            <input
              name="Action"
              value="Action"
              type="checkbox"
              id="Action"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Indie">Indie</label>
            <input
              name="Indie"
              value="Indie"
              type="checkbox"
              id="Indie"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Adventure">Adventure</label>
            <input
              name="Adventure"
              value="Adventure"
              type="checkbox"
              id="Adventure"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="RPG">RPG</label>
            <input
              name="RPG"
              value="RPG"
              type="checkbox"
              id="RPG"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Strategy">Strategy</label>
            <input
              name="Strategy"
              value="Strategy"
              type="checkbox"
              id="Strategy"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Shooter">Shooter</label>
            <input
              name="Shooter"
              value="Shooter"
              type="checkbox"
              id="Shooter"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Casual">Casual</label>
            <input
              name="Casual"
              value="Casual"
              type="checkbox"
              id="Casual"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Simulation">Simulation</label>
            <input
              name="Simulation"
              value="Simulation"
              type="checkbox"
              id="Simulation"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Puzzle">Puzzle</label>
            <input
              name="Puzzle"
              value="Puzzle"
              type="checkbox"
              id="Puzzle"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Arcade">Arcade</label>
            <input
              name="Arcade"
              value="Arcade"
              type="checkbox"
              id="Arcade"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Platformer">Platformer</label>
            <input
              name="Platformer"
              value="Platformer"
              type="checkbox"
              id="Platformer"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Racing">Racing</label>
            <input
              name="Racing"
              value="Racing"
              type="checkbox"
              id="Racing"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Massively-Multiplayer">Massively-Multiplayer</label>
            <input
              name="Massively-Multiplayer"
              value="Massively-Multiplayer"
              type="checkbox"
              id="Massively-Multiplayer"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Sports">Sports</label>
            <input
              name="Sports"
              value="Sports"
              type="checkbox"
              id="Sports"
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Fighting">Fighting</label>
            <input
              name="Fighting"
              value="Fighting"
              type="checkbox"
              id="Fighting"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <br />

        <div>
          <label className="element">Platforms:</label>
          <div id="platforms">
            <label htmlFor="PC">PC</label>
            <input type="checkbox" name="PC" value="PC " onChange={(e) => handleInputChange(e)} />
            &nbsp;&nbsp;
            <label htmlFor="PlayStation 3">PlayStation 3</label>
            <input
              type="checkbox"
              name="PlayStation 3"
              value="PlayStation 3 "
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="PlayStation 4">PlayStation 4</label>
            <input
              type="checkbox"
              name="PlayStation 4"
              value="PlayStation 4 "
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Xbox 360">Xbox 360</label>
            <input
              type="checkbox"
              name="Xbox 360"
              value="Xbox 360 "
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Xbox One">Xbox One</label>
            <input
              type="checkbox"
              name="Xbox One"
              value="Xbox One "
              onChange={(e) => handleInputChange(e)}
            />
            &nbsp;&nbsp;
            <label htmlFor="Nintendo Switch">Nintendo Switch</label>
            <input
              type="checkbox"
              name="Nintendo Switch"
              value="Nintendo Switch "
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <br />

        <div>
          <label className="element">Description:</label>
          <input
            className="field"
            type="text"
            size="18"
            name="description"
            placeholder="In a world where..."
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <br />
      </form>
      <button className="button create-btn" onClick={(e) => submitForm(e)}>
        Create!
      </button>
    </div>
  ) : (
    <div className="success-main">
      <h1>Success!</h1>
      <img className="success-gif" src={success} alt="successGif" />
      <Link to="/home">
        <button className="home-button">← Home</button>
      </Link>
    </div>
  );
}
