import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'


export default function Landing() {
    return (
        <div>
            Estas en Landing
            <br />
            <br />
            <br />
            <br />

            <Link to='/home'>
                <button id='button'>To Home</button>
            </Link>

        </div>
    )
}
