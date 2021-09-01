import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames } from '../../Redux/Actions/actions'
import { setLoading, setPageSelected } from '../../Redux/Actions/buttonsActions'
import './Pagination.css'


export default function Pagination() {
    const dispatch = useDispatch()
    const pageSelected = useSelector(state => state.buttonsReducer.pageSelected)


    const page = []
    for (let i = 1; i <= 10; i++) {
        page.push(i.toString())
        
    }

    // On mount, sets page 1 to active className
    useEffect(() =>{
        let btnContainer = document.getElementsByClassName("page-number");
        btnContainer[0].className = 'page-number active'
        for (let i = 0; i < btnContainer.length; i++) {
            if (btnContainer[i].innerHTML == pageSelected) btnContainer[i].className = 'page-number active'
            if (btnContainer[i].classList.contains('active') && btnContainer[i].innerHTML != pageSelected) btnContainer[i].classList.remove('active')
        }
    },[pageSelected])

    // // When another page is clicked, clears active className and sets it in the new page
    // function current(e){
    //     let btnContainer = document.getElementsByClassName("page-number");
    //     for (let i = 0; i < btnContainer.length; i++) {
    //         if(btnContainer[i].classList.contains('active') && btnContainer[i].innerHTML !== pageSelected) btnContainer[i].classList.remove('active')
    //     }
    //     e.target.className = 'page-number active'
    // }  
    
    return (
        <div className='all-pages'>
            {
                page.map(number => (
                    <p
                        className='page-number' 
                        key={number}
                        onClick={e => {
                            dispatch(getGames(number))
                            dispatch(setPageSelected(number))
                            dispatch(setLoading(true))
                            // current(e)
                        }}>
                        {number}
                    </p>
                ))
            }
        </div>
    )
}
