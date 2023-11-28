import React, {useState, useMemo} from 'react';
import {Link} from "react-router-dom"
import { Navigation, Pagination } from 'swiper'

import './review-swiper.scss'

import styles from './Reviews.module.scss'
import photo from '../../../img/photos/photo.svg'
import place from '../../../img/places/place.svg'
import Logo from "../../../img/logo.svg";
import GrayButton from '../../common/buttons/GrayButton'
import WhiteButton from '../../common/buttons/WhiteButton'
import Slider from '../../common/Slider/Slider'
import ReviewItem from './ReviewItem'

const reviews = [
  {
    id: 1, userPhoto: '', name: 'Кирилл', surName: 'Степанов', rating: 4,
    place: 'FCoffe', city: '', street: '', placeLogo:`${place}`,
    text: 'Интересное место, современный и стильный интерьер. Всегда вкусный кофе. Большой ассортимент десертов. Адекватные цены. Советую для посид...',
    fullReview: 'отзыв полностью', date: '12 октября 2021г',
  },
  {
    id: 0, userPhoto: photo, name: 'Санек', surName: '', rating: 3, place: 'FCM',
    city: '', street: '', placeLogo:`${Logo}`, text: 'Крутая прилага, узнал много новых мест )) Рекомендую! ',
    fullReview: '', date: '7 октября 2021г',
  },
  {
    id: 2, userPhoto: photo, name: 'Санек', surName: '', rating: 3, place: 'FCM',
    city: '', street: '', placeLogo:`${Logo}`, text: 'Крутая прилага, узнал много новых мест )) Рекомендую! ',
    fullReview: '', date: '7 октября 2021г',
  },
  {
    id: 3, userPhoto: '', name: 'Кирилл', surName: 'Степанов', rating: 4,
    place: 'FCoffe', city: '', street: '', placeLogo:`${place}`,
    text: 'Интересное место, современный и стильный интерьер. Всегда вкусный кофе. Большой ассортимент десертов. Адекватные цены. Советую для посид...',
    fullReview: 'отзыв полностью', date: '12 октября 2021г',
  },
  {
    id: 4, userPhoto: photo,name: 'Алена',surName: '', rating: 4, place: 'HOTFIX',
    city: 'Минск', street: 'пр. Партизанский, 150 А', placeLogo:`${place}`,
    text: 'Всегда вкусный кофе. И улыбчивый персонал. За кофе только в Хотфикс! Часто бывают скидки и акционные предложения.',
    fullReview: '', date: '9 октября 2021г',
  },
]

const Reviews = () => {
  const[limitSymbols, setlimitSymbols] = useState(30);
  
 const mixedReviews = useMemo(() =>{
    const forMix = [...reviews]
    const result = []
    let reviewAboutService = true;
    for(let i = 0; i<reviews.length; i++){

      if(reviewAboutService){
        for (let i=0; i < forMix.length; i++){
          if(forMix[i].place === 'FCM'){
            result.push(forMix[i]);
            forMix.splice(i,1);
            reviewAboutService = !reviewAboutService;
            break;
          }
        }
      }else{
        for (let i=0; i < forMix.length; i++){
          if(forMix[i].place !== 'FCM'){
            result.push(forMix[i]);
            forMix.splice(i,1);
            reviewAboutService = !reviewAboutService;
            break;
          }
        }
      }
    }
    if (forMix.length>0) 
      {for(let item in forMix)
        {
          result.push(forMix[item])}
        }
    return result
  },[reviews])

  return (
    <section className={styles.reviews}>
      <div className="secondContainer">
        <h2 className="title">Отзывы о нас и наших партнерах</h2>
      </div>
      <div className="container">
        <Slider
          loop={true}
          spaceBetween={0}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          grabCursor={true}
          className="slider reviews-images-slider"
          onSlideChange = {()=>setlimitSymbols(30)}
        >
          {mixedReviews.map((item, index) => (
            <ReviewItem key={index} review={item} limit = {limitSymbols} 
            setLimit = {setlimitSymbols}/>
          ))}
        </Slider>

        <div className={styles.button}>
          <Link to = "/reviews">
            <GrayButton text="Все отзывы" />
          </Link>
        </div>
        <div className={styles.button}>
          <WhiteButton text="Разместить заказ" />
        </div>
      </div>
    </section>
  )
}
export default Reviews
