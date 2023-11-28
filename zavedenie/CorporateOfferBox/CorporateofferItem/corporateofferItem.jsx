import React from 'react';
import style from './corporateofferItem.module.css'
const CorporateofferItem = (props) => {
   
    return (
        <div className = {style.corporateoffer_item}>
            <img src = {props.src}></img>
        </div>
    );
};

export default CorporateofferItem;