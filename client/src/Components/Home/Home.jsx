import React from 'react';
import './Home.css'
import Buttons from '../Buttons/Buttons.jsx'
import Cards from '../Cards/Cards.jsx'


export default function Home() {

    return (
        <div className='main-container'>
            <Buttons />
            <Cards />
        </div>
    )
}
