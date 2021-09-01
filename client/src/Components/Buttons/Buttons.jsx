import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setSources, setOptionsSelected } from '../../Redux/Actions/buttonsActions'
import './Buttons.css'

export default function Buttons() {
    const [API, setAPI] = useState(true)
    const [DB, setDB] = useState(true)
    const [order, setOrder] = useState('Default')
    const [rating, setRating] = useState('Default')

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setSources(API, DB))
        dispatch(setOptionsSelected(rating, order))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        dispatch(setSources(API, DB))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[API, DB])

    useEffect(() => {
        dispatch(setOptionsSelected(rating, order))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[rating, order])

    return (
        <div className='buttons'>
            
            <span>Results from: &nbsp;</span>
                <input type="checkbox" defaultChecked={true} onChange={e => setAPI(!API)}/>
                <label>API</label>
                <input type="checkbox" defaultChecked={true} onChange={e => setDB(!DB)}/>
                <label>DB</label>

            {/* <span>&nbsp;&nbsp;&nbsp;&nbsp;Sort by:&nbsp;</span> */}
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Order:&nbsp;</label>
                    <select className='order' name="Order" id="Order" onChange={e => setOrder(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>


                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Rating:&nbsp;</label>
                    <select name="Weight" id="Weight" onChange={e => setRating(e.target.value)}>
                        <option value="Default">Default</option>
                        <option value="Highest-first">Highest first</option>
                        <option value="Lowest-first">Lowest first</option>
                    </select>
        </div>
    )
}
