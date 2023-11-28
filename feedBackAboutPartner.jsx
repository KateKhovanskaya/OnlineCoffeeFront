import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {useSelector} from 'react-redux';
import {Link, useParams} from "react-router-dom";
import arrow from "./img/icons/arrow.svg";
import styles from './feedbackAboutPartner.module.scss';
import logo1 from './img/partners/logo1.svg';
import cn from "classnames";
import womanWithCoffee from './img/icons/woman_with_coffee.jpg';
import {ReactComponent as Star} from './img/icons/ratingStar.svg';
import {ReactComponent as Check} from './img/icons/check.svg';
import GrayButton from "./buttons/GrayButton";
import ModalWindow from './ModalWindows/modalWindow';

const FeedBackAboutPartner = () =>{
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth)
    console.log("AUTH")
    console.log(auth)
    return(
        <div>
            <div className = {styles.title}>
                <button onClick={() => navigate(-1)} className={styles.back}>
                    <img src={arrow} alt="Вернуться назад" />
                </button>
                <p>Оставить отзыв</p>
            </div>
            <div className = {styles.partnerFormContainer}>
                <FeedBackForm />
            </div>
            
        </div>
    )
}

export default FeedBackAboutPartner;

const FeedBackForm = ()=>{
    const params = useParams();
    const isError = false;
    // const monthes = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const user = {id:0, name: "Алекс", img:''};//`${photo}`
    const partner ={id:0, name: "HOTFIX", adress:"г.Минск, пр.Жукова, 44", img:`${logo1}`}
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [modal, setModal]= useState(false)

    const onSubmit = () => {
        console.log(state);
        handleChange('rating', '');
        reset();
        setModal(true);
    }

    
    const [state, setState] = useState({
    user_id: user.id,
    image: user.img,
    name: user.name,
    partner_id: partner.id,
    rating: '',
    feedback: '',
    date: new Date()
  })

  function handleChange(name, value) {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className = {cn(styles.group, isError && styles.error, styles.name_info)}>
            {state.image !== '' 
                ?
                <div className = {styles.avatar}>
                    <div className={styles.avatarImg} style = {{backgroundImage:`url(${state.image})`}}>
                    </div>
                </div>
                :
                <div className = {styles.nullPhotoBox}>
                    <div>
                        {state.name.toUpperCase().substring(0,2)}
                    </div>
                </div>
            }
            <input
                type = "text"
                name="name"
                {... register("name", {required: "Field is required"})}
                value={state.name}
                onChange={(e) => {
                    handleChange('name', e.target.value)
                }}
                className = {cn(styles.group__input,
                    watch("name") && styles.group__focus)}
                placeholder = ""
            />
            {state.name === '' && <p className={cn(styles.clue, styles.clue_name)}>Имя не введено</p>}
            <label
                className={cn(
                    styles.group__label,
                    watch("name") && styles.group__active, styles.name_label
                )}
                >
                Ваше имя <span style = {{color:'red'}}>*</span>
            </label>
        </div>

        <div className = {cn(styles.group, styles.date_info)}>
            <p className={styles.date_title}>Дата отзыва</p>
            <p className = {cn(styles.date_title, styles.feedback_date)}>{state.date.toLocaleDateString()}</p>   
        </div>

        <div className = {cn(styles.group, styles.partner_info)}>
            <div>
                <p className={styles.date_title}>Адрес сети</p>
                <p className={styles.partner_name}>{partner.name}</p>
                <p className={styles.partner_adress}>{partner.adress}</p>
            </div>
            <div className = {styles.partner_logo} style = {{backgroundImage:`url(${partner.img})`}}></div>

        </div>

        <div className = {cn(styles.group, styles.rating_box, isError && styles.error)}>
            <div><img className = {styles.women} src = {womanWithCoffee} alt = "woman"></img></div>
            <div className = {styles.rating_right_box}>
                <p className = {styles.question}>Как вас обслужили?</p>
                <div className = {styles.star_box}>
                    {[1,2,3,4,5].map((value)=>(  
                        (state.rating >= value && <Star
                            key = {value}
                            onClick={()=>{handleChange('rating', value)}}
                            height = {32} width = {32} 
                            className = {styles.bluestar}/>)
                        ||
                        (state.rating < value && <Star
                            key = {value}
                            onClick={()=>{handleChange('rating', value)}}
                            height = {32} width = {32}
                            className = {styles.graystar}/>
                            )      
                    ))}
                </div>
                {state.rating === '' && <p className={cn(styles.clue, styles.clue_rating)}>Поставьте оценку</p>}
            </div>
        </div>

        <div className = {cn(styles.group, styles.textarea_box, isError && styles.error)}>
                <textarea
                    name = "feedback"
                    maxLength = {500}
                    {... register("feedback", {required: "Field is required"})}
                    className = {cn(styles.group__input,
                        watch("feedback") && styles.group__focus, styles.feedbackarea)}
                    placeholder = ""
                    onChange={(e) => {
                        handleChange('feedback', e.target.value)
                    }}
                />
                {state.feedback.length === 0 && <p className={cn(styles.clue, styles.clue_textarea_error)}>Заполните поле</p>}
                <label
                    className={cn(
                        styles.group__label,
                        watch("feedback") && styles.group__active
                    )}
                    >
                    Введите текст отзыва <span style = {{color:'red'}}>*</span>
                </label>
                <p className={cn(styles.clue, styles.clue_textarea)}><span>{500 - state.feedback.length}</span> символов осталось</p>
            </div>

            <div className={styles.button}>
                
                <GrayButton text="Отправить" dis = {state.name !=="" && state.rating !=="" && state.feedback !==""}/>
            </div>
            <ModalWindow visible = {modal} setVisible = {setModal}>
                <div className = {styles.modalContentBox}>
                <div className = {styles.modalContent}>
                    <div className = {styles.modal_text_box}>
                        <div className = {styles.galka}>
                            <Check height = {12} width = {14}/>
                        </div>
                        <div className = {styles.modal_text}>Благодарим за отзыв</div>
                    </div>
                    <Link to = "/">
                        <button className = {styles.modalButton}>Назад к заказам</button>
                    </Link>
                    
                </div>
                </div>
            </ModalWindow>
    </form>
  )
}