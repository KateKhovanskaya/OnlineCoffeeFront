import React from 'react';
import styles from '../zavedenie.module.css';
import star from '../../../img/star.png';
import clock from '../../../img/clock.png';
import arrow from '../../../img/location-arrow.png';

const ZavedenieInfo = (props) => {
   
    return (
        <div className = {styles.about_zavedenie}>
                <div className = {styles.logo_zavedenia_background}>
                    <div className = {styles.logo_zavedenia}></div>
                </div>
                <div className = {styles.text_box}>
                    <div className = {styles.white_text}>{props.zavedenieInfo.name}</div>
                    <div className = {styles.adress}>{props.zavedenieInfo.adress}</div>
                    <div className = {styles.info_box}>
                        <div className = {styles.infoitem_box}>
                            <div><img src = {star} alt = "star"></img></div>
                            <div className = {styles.infoitem_text}>{props.zavedenieInfo.rating}</div>
                        </div>
                        <div className = {styles.infoitem_box}>
                            <div className = {styles.image_box}>
                                <img src = {clock} alt = "clock"></img>
                            </div>
                            <div className = {styles.infoitem_text}>{props.zavedenieInfo.worktime}</div>
                        </div>
                        <div className = {styles.infoitem_box}>
                            <div className = {styles.image_box}><img src = {arrow} alt = "arrow"></img></div>
                            <div className = {styles.infoitem_text}>{props.zavedenieInfo.distance}</div>
                        </div>
                        <div className = {styles.infoitem_box}></div>
                        <div className = {styles.infoitem_box}></div>
                    </div>
                </div>
           </div>
        );
    };
    
    export default ZavedenieInfo;