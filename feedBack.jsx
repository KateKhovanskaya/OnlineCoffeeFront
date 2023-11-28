import React, {useState} from 'react';
import formstyle from './Authorization.module.scss';
import styles from './feedBack.module.scss';
import dialogue from '../img/icons/dialogue.svg';
import { useForm } from "react-hook-form";
import cn from "classnames";
import {ReactComponent as CoffeWhite} from "../img/icons/coffeWhite_feedback.svg";
import {ReactComponent as CoffeBlue} from "../../img/icons/coffeBlue_feedback.svg";
import GrayButton from "../buttons/GrayButton";
import BtnToMain from '../buttons/BtnToMain';
import { HeaderWithIcon } from '../HeaderWithIcon/HeaderWithIcon'
import { Footer } from '../Footer/Footer'


const FeedBack = () =>{

    return(
        <div>
            <HeaderWithIcon text={'оставить отзыв'} iconPath={dialogue} />
            <div className = {styles.calltodo}>
                Пожалуйста, оставьте ваш отзыв и оцените качество услуг сервиса:
            </div>
            <div className = {styles.formContainer}>
                <FeedBackForm/>
                <BtnToMain />
                
            </div>
            <Footer/>

        </div>

    )
}

export default FeedBack;

const FeedBackForm = ()=>{
    const isError = false;
    const monthes = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // const onSubmit = () => {
    //     console.log(state);
    //     reset();
    //     handleChange('rating', '')
    // }

    const handleFetch = async () => {
        try {
          const response = await fetch('https://fcmapi.herokuapp.com/client/api-feedback', {
            method: 'POST',
            body: JSON.stringify({ name:state.name, messange:state.message, email:"test@test.ru", phone_number: 7900111}),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          reset();
          handleChange('rating', '')
        const data = await response.json()
        //   console.log(data)
        } catch (error) {
          console.error(error)
        }
      }
    
    const [state, setState] = useState({
    // image: "http://localhost:3000/static/media/photo.7d542e4cc13f874b5a8f44d235c970da.svg",
    image:'',
    name: '',
    place:'FCoffee',
    rating: '',
    message: '',
    date: new Date()
  })

  function handleChange(name, value) {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      handleChange('image', url)
    }
   
    }

    return(
        <form onSubmit={handleSubmit(handleFetch)} className = {formstyle.form}>
            <div className = {cn(formstyle.group, isError && formstyle.error)}>
                <input
                    type = "text"
                    name="name"
                    {... register("name", {required: "Field is required"})}
                    value={state.name}
                    onChange={(e) => {
                        handleChange('name', e.target.value)
                    }}
                    className = {cn(formstyle.group__input,
                        watch("name") && formstyle.group__focus)}
                    placeholder = ""
                />
                {isError && state.name === '' && <p className={formstyle.clue}>Укажите имя</p>}
                <label
                    className={cn(
                        formstyle.group__label,
                        watch("name") && formstyle.group__active
                    )}
                    >
                    Ваше имя <span style = {{color:'red'}}>*</span>
                </label>
                {state.image ?(
                    <div className = {styles.avatar}>
                        <div className={styles.avatarImg} style = {{backgroundImage:`url(${state.image})`}}>
                        </div>
                    </div>):(
                    <div className = {styles.avatar}>    
                    <div className={styles.avatarImg}>
                        <label htmlFor="file-input">Ваше<br></br>фото</label>
                        <input id="file-input" type="file" onChange={handleImageChange}/>
                    </div>
                    </div>
                    )}
            </div>  
 
            <div className = {cn(styles.group, isError && styles.error, styles.rating_box)}>
                <div className = {cn(styles.group__input,
                        styles.group__focus, styles.cofeebox)}>
                            {[1,2,3,4,5].map((value)=>(
                                
                  (state.rating >= value && <CoffeBlue
                    key = {value}
                    onClick={()=>{handleChange('rating', value)
                                }}
                    /> )||
                 (state.rating < value && <CoffeWhite
                    key = {value}
                    onClick={()=>{handleChange('rating', value)}}
                    />)
                    
                ))}
               
                </div>
                <label
                    className={cn(
                        styles.group__label,
                        state.rating !=='' && styles.group__active, styles.label_rating
                    )}
                    >
                    Оцените платформу <span style = {{color:'red'}}>*</span>
                </label>                 
                <p className={cn(styles.clue, styles.clue_text_rating)}>
                    {state.rating === 1 && "Ужасно"}
                    {state.rating === 2 && "Плохо"}
                    {state.rating === 3 && "Удовлетворительно"}
                    {state.rating === 4 && "Хорошо"}
                    {state.rating === 5 && "Отлично"}
                </p>
                {isError && state.rating === '' &&(
                    <p className={cn(styles.clue, styles.clue_rating)}>
                        Оцените платформу
                    </p>
                )}
            </div>   
            <div className = {formstyle.group}>
                <textarea
                    name = "message"
                    maxLength = {500}
                    {... register("message", {required: "Field is required"})}
                    className = {cn(formstyle.group__input,
                        watch("message") && formstyle.group__focus, styles.feedbackarea)}
                    placeholder = ""
                    onChange={(e) => {
                        handleChange('message', e.target.value)
                    }}
                />
                <label
                    className={cn(
                        formstyle.group__label,
                        watch("message") && formstyle.group__active
                    )}
                    >
                    Введите текст отзыва <span style = {{color:'red'}}>*</span>
                </label>
                <p className={formstyle.clue}><span>{500 - state.message.length}</span> символов осталось</p>
            </div>
            <div className = {formstyle.group}>
                
                    <p className={styles.date_title}>Дата отзыва</p>
                    {/* <p className = {styles.feedback_date}>{state.date.toLocaleDateString()}</p> */}
                    <p className = {styles.feedback_date}>{state.date.getDate()} {monthes[state.date.getMonth()]} {state.date.getFullYear()}</p>
                    
            </div>
            <div className={formstyle.button}>
                
                <GrayButton text="Отправить" dis = {state.name !=="" && state.rating !=="" && state.message !==""}/>
            </div>           
        </form>
    )
}