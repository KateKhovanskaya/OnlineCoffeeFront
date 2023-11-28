import React from 'react';
import style from './corporateoffer.module.css'
// import CorporateofferItem from './CorporateofferItem/corporateofferItem';
import {useState, useEffect, Children, cloneElement} from 'react'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

const PAGE_WIDTH = 270

const CorporateofferBox = ({children}) => {
   
   const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)

   const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
        const newOffset = currentOffset + PAGE_WIDTH
        return Math.min(newOffset, 0)
    })
   }

   const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
        const maxOffset = -(PAGE_WIDTH*(pages.length-1))
        const newOffset = currentOffset - PAGE_WIDTH
        return Math.max(newOffset, maxOffset)
    })
   }

   useEffect(() => {
    setPages(
        Children.map(children, child =>{
            return cloneElement(child, {
                style: {
                    height: '100%',
                    minWidth: `${PAGE_WIDTH}px`,
                    maxWidth: `${PAGE_WIDTH}px`,
                }
            })
        })
    )
   }, [])
   

    return (
        <div className = {style.corporateoffer_box}>
            <FaChevronLeft className = {style.arrow} onClick = {handleLeftArrowClick}/>
            <div className = {style.offer_window}>
                <div className = {style.all_items_container}
                style = {{
                    transform: `translateX(${offset}px)`,
                }}
                >{children}</div>
            </div>
            <FaChevronRight className = {style.arrow} onClick = {handleRightArrowClick}/>
        </div>
    );
};

export default CorporateofferBox;