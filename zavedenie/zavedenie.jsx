import React from 'react';
import styles from './zavedenie.module.css';
import star from '../../img/star.png';
import clock from '../../img/clock.png';
import arrow from '../../img/location-arrow.png';
import CorporateofferBox from './CorporateOfferBox/corporateofferBox';
import offer1 from "../../img/offer1.png"
import offer2 from "../../img/offer2.png"
import offer3 from "../../img/offer3.png"

//import {useHistory} from 'react-router-dom';

const Zavedenie = (props) => {
   
    return (
        <div>
            <div className={styles.foto_zavedenia}>
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
            </div>
            <CorporateofferBox>
                {/* <CorporateofferItem src = {offer1}/>
                <CorporateofferItem src = {offer2}/>
                <CorporateofferItem src = {offer3}/> */}
                <div><img src = {offer1}></img></div>
                <div><img src = {offer2}></img></div>
                <div><img src = {offer3}></img></div>
            </CorporateofferBox>
        </div>
    );
};

export default Zavedenie;