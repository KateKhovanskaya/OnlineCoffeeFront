import React, {useState} from 'react';
import styles from './Reviews.module.scss'
import photo from '../../../img/photos/photo.svg'
import place from '../../../img/places/place.svg'
import {ReactComponent as CoffeWhite} from '../../../img/icons/coffeWhite.svg'
import {Link} from "react-router-dom"
const ReviewItem = (props) => {

  // const[limitSymbols, setlimitSymbols] = useState(props.limit);
    // const {
    //   userPhoto,
    //   name,
    //   surName,
    //   place,
    //   placeLogo,
    //   city,
    //   street,
    //   text,
    //   fullReview,
    //   date,
    //   rating,
    // } = review
 
    return (
      <article className={styles.review}>
        <div className={styles.review__header}>
          <div className={styles.left}>
            <div className={styles.user}>
              <div className={styles.user__photo}>
                {props.review.userPhoto === ''
                ?
                  <div className = {styles.nullPhotoBox}>
                    <div>
                      {props.review.name.charAt(0)}
                    </div>
                  </div>
                :
                  <img src={props.review.userPhoto} alt="user" />}
                {/* <img src={props.review.userPhoto} alt="user" /> */}
              </div>
              <div className={styles.user__name}>
                <div className={styles.name}>{props.review.name}</div>
                <div className={styles.surName}>{props.review.surName}</div>
              </div>
            </div>
            <div className={styles.place}>
              <div className={styles.place__name}>{props.review.place}</div>
              <div className={styles.place__rating}>
                {[1,2,3,4,5].map((value)=>(
                  (props.review.rating >= value && 
                  <CoffeWhite key={value} height = {17} width = {17} className = {styles.bluecoin} />)||
                  (props.review.rating < value && 
                  <CoffeWhite key={value} height = {17} width = {17}/>)
                  ))}
              </div> 
              <div className={styles.place__city}>{props.review.city}</div>
              <div className={styles.place__street}>{props.review.street}</div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.logo}>
              <img src={props.review.placeLogo} alt="place" />
            </div>
          </div>
        </div>
        {/* <p className={styles.review__text}>{props.review.text}</p> */}
        {props.review.text.length > props.limit
        ? 
          <div>
            <p className={styles.review__text}>{props.review.text.substring(0,props.limit)}...</p>
            <div className={styles.review__full} onClick = {()=>props.setLimit(props.review.text.length +5)}>отзыв полностью</div>
         </div>
        :
        <p className={styles.review__text}>{props.review.text}</p>
      }
        {/* <p className={styles.review__text}>{props.review.text.substring(0,limitSymbols)}...</p> */}
        {/* <div className={styles.review__full}>{props.review.fullReview}</div> */}
      {/* <div className={styles.review__full}><Link to ={`/reviews#${props.review.id}`}>{props.review.fullReview}</Link></div> */}
      {/* <div className={styles.review__full}>{props.review.fullReview}</div> */}
        <div className={styles.review__date}>{props.review.date}</div>
      </article>
    )
  }

  export default ReviewItem;