import React, { useState, useMemo, useRef, useEffect } from 'react'
import ReviewItem from '../ReviewItem'
import photo from '../img/photos/photo.svg'
import place from '../img/places/place.svg'
import Logo from '../img/mainlogo.svg'
import styles from './reviewsPage.module.scss'
import { useFetching } from '../useFetching'

const reviews = [
  {
    id: 1,
    userPhoto: photo,
    name: 'Кирилл',
    surName: 'Степанов',
    rating: 4,
    place: 'FCoffe',
    city: '',
    street: '',
    placeLogo: `${Logo}`,
    text: 'Интересное место, современный и стильный интерьер. Всегда вкусный кофе. Большой ассортимент десертов. Адекватные цены. Советую для посид...',
    fullReview: '',
    date: '12 октября 2021г',
  },
  {
    id: 0,
    userPhoto: photo,
    name: 'Санек',
    surName: '',
    rating: 3,
    place: 'Cofix',
    city: 'Минск',
    street: 'ул. Ленинградская, 1',
    placeLogo: `${place}`,
    text: 'Крутая прилага, узнал много новых мест )) Рекомендую! ',
    fullReview: '',
    date: '7 октября 2021г',
  },
  {
    id: 2,
    userPhoto: photo,
    name: 'Алена',
    surName: '',
    rating: 4,
    place: 'HOTFIX',
    city: 'Минск',
    street: 'пр. Партизанский, 150 А',
    placeLogo: `${place}`,
    text: 'Всегда вкусный кофе. И улыбчивый персонал. За кофе только в Хотфикс! Часто бывают скидки и акционные предложения.',
    fullReview: '',
    date: '9 октября 2021г',
  },
  {
    id: 3,
    userPhoto: photo,
    name: 'Iren',
    surName: '',
    rating: 5,
    place: 'FCM',
    city: '',
    street: '',
    placeLogo: `${Logo}`,
    text: 'Классный и удобный сервис для заказа кофе и десертов. Нет необходимости простаивать в очередях, тратить время и нервнича...',
    fullReview: '',
    date: '22 октября 2021г',
  },
  {
    id: 4,
    userPhoto: photo,
    name: 'Кирилл',
    surName: 'Степанов',
    rating: 4,
    place: 'FCoffe',
    city: '',
    street: '',
    placeLogo: `${Logo}`,
    text: 'Интересное место, современный и стильный интерьер. Всегда вкусный кофе. Большой ассортимент десертов. Адекватные цены. Советую для посид...',
    fullReview: '',
    date: '12 октября 2021г',
  },
  {
    id: 5,
    userPhoto: photo,
    name: 'Санек',
    surName: '',
    rating: 3,
    place: 'Cofix',
    city: 'Минск',
    street: 'ул. Ленинградская, 1',
    placeLogo: `${place}`,
    text: 'Крутая прилага, узнал много новых мест )) Рекомендую! ',
    fullReview: '',
    date: '7 октября 2021г',
  },
  {
    id: 6,
    userPhoto: photo,
    name: 'Алена',
    surName: '',
    rating: 4,
    place: 'HOTFIX',
    city: 'Минск',
    street: 'пр. Партизанский, 150 А',
    placeLogo: `${place}`,
    text: 'Всегда вкусный кофе. И улыбчивый персонал. За кофе только в Хотфикс! Часто бывают скидки и акционные предложения.',
    fullReview: '',
    date: '9 октября 2021г',
  },
  {
    id: 7,
    userPhoto: photo,
    name: 'Iren',
    surName: '',
    rating: 5,
    place: 'FCM',
    city: '',
    street: '',
    placeLogo: `${Logo}`,
    text: 'Классный и удобный сервис для заказа кофе и десертов. Нет необходимости простаивать в очередях, тратить время и нервнича...',
    fullReview: '',
    date: '22 октября 2021г',
  },
]

const RewiewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all_reviews')
  const [searchQuery, setSearchQuery] = useState('')
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(reviews.length/limit)
  const lastElement = useRef()
  const observer = useRef()

  const [fetchReviews, isReviewsLoading, reviewError] = useFetching(
    async (page) => {
      {
        setLimit(page * 2)
      }
    }
  )

  const choiceReviews = (selectedCategory) => {
    setSelectedCategory(selectedCategory)
    setSearchQuery('')
  }

  const selectedReviews = useMemo(() => {
    if (selectedCategory === 'about_service') {
      return [...reviews].filter((r) => r.place === 'FCM')
    } else {
      if (selectedCategory === 'about_partners') {
        return [...reviews].filter((r) => r.place !== 'FCM')
      } else {
        return [...reviews]
      }
    }
  }, [selectedCategory, reviews])

  const searchedReviews = useMemo(() => {
    return selectedReviews.filter((review) =>
      review.place.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [selectedReviews, searchQuery])

  useEffect(() => {
    fetchReviews(page)
  }, [page])

  useEffect(() => {
    if (isReviewsLoading) return
    if (observer.current) observer.current.disconnect()
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting && limit < reviews.length) {
        setPage(page + 1)
      }
    }
    observer.current = new IntersectionObserver(callback)
    observer.current.observe(lastElement.current)
  }, [isReviewsLoading])

  return (
    <div style={{ marginTop: '15px' }}>
      <div className={styles.select_container}>
        <select
          value={selectedCategory}
          onChange={(event) => choiceReviews(event.target.value)}
        >
          <option value="all_reviews">Все отзывы</option>
          <option value="about_service">Отзывы о сервисе</option>
          <option value="about_partners">Отзывы о заведениях</option>
        </select>
      </div>
      {selectedCategory === 'about_partners' && (
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
      )}
      {searchedReviews.length > 0 ? (
        <>
          {searchedReviews.slice(0, limit).map((item) => (
            <div key={item.id} className={styles.review_container} id={item.id}>
              <ReviewItem review={item} limit={item.text.length + 5} />
            </div>
          ))}
          <div
            style={{ height: '20px', width: '100%' }}
            ref={lastElement}
          ></div>
        </>
      ) : (
        <div className={styles.notFound}>Отзывы не найдены</div>
      )}
    </div>
  )
}
export default RewiewsPage
