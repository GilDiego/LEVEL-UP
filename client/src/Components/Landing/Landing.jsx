import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'


export default function Landing() {
    return (
        <div className='welcome-main'>
            <div className='welcome-div'>
            
            <p className='welcome-text'>
                <b>Level Up</b> is a videogame-encylopedia project made
                with <i className="fas fa-heart"/> by <b>Diego Gil</b>&nbsp; 
                for <b>Henry</b>&nbsp;<i className="fas fa-rocket"/>
                <br />
                <br />
                This single-page <b>Full-stack</b> web application employs the following 
                technologies: React, Redux, Express, Sequelize and Postgres; as well
                as several libraries.
                <br />
                <br />
                <b>Level Up</b> feeds from the RAWG.io API to make its requests.
            </p>

            <Link to='/home'>
                <button className='welcome-button'>TAKE A LOOK!</button>
            </Link>

            </div>
        </div>
        
    )
}
