import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import './NewGame.css'
import success from '../../Media/success.gif'

export default function NewGame() {
    const [editing, setEditing] = useState(true)
    const [errors, setErrors] = useState({ form: 'All fields are required' });
    const [genres, setGenres] = useState([])
    const [input, setInput] = useState({
        name: '',
        description: '',
        release: '',
        rating: '',
        genres: [],
        platforms: '',
        image: 'img',
    })
    const dispatch = useDispatch()

    function handleInputChange(e){
        if (e.target.parentNode.id === 'genres') {
            
            
            if (e.target.checked) {
                setInput(prevState => ({
                    ...prevState,
                    genres: input.genres.concat(e.target.value)
                }))
            } else {
                setInput(prevState => ({
                    ...prevState,
                    genres: input.genres.filter(x => e.target.value !== x)
                }))
            }
        }
        if (e.target.parentNode.id === 'platforms') {
            if (e.target.checked) {
                setInput(prevState => ({
                    ...prevState,
                    platforms: input.platforms.concat(e.target.name + ' ')
                }))
            } else {
                setInput(prevState => ({
                    ...prevState,
                    platforms: input.platforms.filter(x => e.target.name !== x)
                }))
            }
        }
        if (e.target.type !== 'checkbox') {
            setInput(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
        
    }

    const validate = form => {
        let errors = {};
        if (!form.name) {
            errors.name = 'Name is required';
        } else if (form.name.length < 4) {
            errors.name = 'Name must have at least 4 characters';
        }
        if (!form.description) {
            errors.description = 'Description is required';
        } else if (form.description.length < 8) {
            errors.description = 'Description must have at least 8 characters'
        }
        if (!form.rating) {
            errors.rating = 'Rating is required';
        } else if (!/^[1-5]$/.test(form.rating)) {
            errors.rating = 'Rating must be between 1 and 5';
        }
        
        return errors;
    }


    function submitForm(e){
        e.preventDefault();

        validate(input);
        let checkboxesErrors = []
        if (input.genres.length < 1) checkboxesErrors.push('Genres is required');
        if (input.platforms.length < 1) checkboxesErrors.push('Platforms is required');
        if (checkboxesErrors.length) {
            
            return alert(Object.values(errors).concat(checkboxesErrors).join('\n'));
        }

        if (input.name.length && input.description.length && input.release.length && 
            input.rating.length && input.genres.length && input.platforms.length) {
            setEditing(false)
        fetch('http://localhost:3001/new',{
            method: 'POST',
            headers:{'Content-type': 'application/json'},
            body:JSON.stringify(input)
        })
        setGenres([])
        setInput({
            name: '',
            description: '',
            release: '',
            rating: 0,
            genres: [],
            platforms: '',
            image: 'img',
        })
        }
        else alert('All fields are required.')
        
}


    return (


        editing? (
            <div className='creation-main'>
                <h1> Creation Studio </h1>
                <form>
                    <div>
                        <label className='element'>Name:</label>
                        <input className='field' type="text" size='10' name="name" placeholder='Destiny 3' autoComplete='off' onChange={e => handleInputChange(e)} />
                    </div>
                    <br />


                    <div>
                        <label className='element'>Release:</label>
                        <input className='field' type="date" size='10' name="release" placeholder='YYYY-MM-DD' autoComplete='off' onChange={e => handleInputChange(e)} />
                    </div>
                    <br />

                    <div>
                        <label className='element'>Rating:</label>
                        <input className='field' type="number" min='1' max='5' size='10' name="rating" placeholder='1 to 5' autoComplete='off' onChange={e => handleInputChange(e)} />
                    </div>
                    <br />

                    <div >
                        <label className='element'>Genres:</label>
                            <div id='genres'>
                                <label htmlFor="Action">Action</label>
                                <input name='Action' value='Action' type="checkbox" id="Action" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                                <label htmlFor="Indie">Indie</label>
                                <input name='Indie' value='Indie' type="checkbox" id="Indie" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                                <label htmlFor="Adventure">Adventure</label>
                                <input name='Adventure' value='Adventure' type="checkbox" id="Adventure" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="RPG">RPG</label>
                                <input name='RPG' value='RPG' type="checkbox" id="RPG" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;

                                <label htmlFor="Strategy">Strategy</label>
                                <input name='Strategy' value='Strategy' type="checkbox" id="Strategy" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;

                                <label htmlFor="Shooter">Shooter</label>
                                <input name='Shooter' value='Shooter' type="checkbox" id="Shooter" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Casual">Casual</label>
                                <input name='Casual' value='Casual' type="checkbox" id="Casual" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Simulation">Simulation</label>
                                <input name='Simulation' value='Simulation' type="checkbox" id="Simulation" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Puzzle">Puzzle</label>
                                <input name='Puzzle' value='Puzzle' type="checkbox" id="Puzzle" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Arcade">Arcade</label>
                                <input name='Arcade' value='Arcade' type="checkbox" id="Arcade" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Platformer">Platformer</label>
                                <input name='Platformer' value='Platformer' type="checkbox" id="Platformer" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Racing">Racing</label>
                                <input name='Racing' value='Racing' type="checkbox" id="Racing" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;

                                <label htmlFor="Massively-Multiplayer">Massively-Multiplayer</label>
                                <input name='Massively-Multiplayer' value='Massively-Multiplayer' type="checkbox" id="Massively-Multiplayer" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Sports">Sports</label>
                                <input name='Sports' value='Sports' type="checkbox" id="Sports" onChange={e => handleInputChange(e)}/>
                                &nbsp;&nbsp;
                            
                                <label htmlFor="Fighting">Fighting</label>
                                <input name='Fighting' value='Fighting' type="checkbox" id="Fighting" onChange={e => handleInputChange(e)}/>
                            </div>
                    </div>
                    <br />

                    <div>
                        <label className='element'>Platforms:</label>
                        <div id='platforms'>
                            <label htmlFor="PC">PC</label>
                            <input type='checkbox' name='PC' value='PC ' onChange={e => handleInputChange(e)}/>
                            &nbsp;&nbsp;

                            <label htmlFor="PlayStation 3">PlayStation 3</label>
                            <input type='checkbox' name='PlayStation 3' value='PlayStation 3 ' onChange={e => handleInputChange(e)}/>
                            &nbsp;&nbsp;

                            <label htmlFor="PlayStation 4">PlayStation 4</label>
                            <input type='checkbox' name='PlayStation 4' value='PlayStation 4 ' onChange={e => handleInputChange(e)}/>
                            &nbsp;&nbsp;

                            <label htmlFor="Xbox 360">Xbox 360</label>
                            <input type='checkbox' name='Xbox 360' value='Xbox 360 ' onChange={e => handleInputChange(e)}/>
                            &nbsp;&nbsp;

                            <label htmlFor="Xbox One">Xbox One</label>
                            <input type='checkbox' name='Xbox One' value='Xbox One ' onChange={e => handleInputChange(e)}/>
                            &nbsp;&nbsp;

                            <label htmlFor="Nintendo Switch">Nintendo Switch</label>
                            <input type='checkbox' name='Nintendo Switch' value='Nintendo Switch ' onChange={e => handleInputChange(e)}/>
                        </div>

                    </div>
                    <br />

                    <div>
                        <label className='element'>Description:</label>
                        <input className='field' type="text" size='18' name="description" placeholder='In a world where...' autoComplete='off' onChange={e => handleInputChange(e)} />
                    </div>
                    <br />

                </form>
                        <button className='button create-btn' onClick={e => submitForm(e)}>Create!</button>
            </div>
        ): (
            <div className='success-main'>
            <h1>Success!</h1>
            <img className='success-gif' src={success} alt="successGif" />
                    <Link to='/home'>
                        <button className='home-button'>← Home</button>
                    </Link>

            </div>
        )


    )
}
