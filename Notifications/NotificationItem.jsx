import actionimg from "../../../../img/specials/special5.jpg";
import senderlogo1 from "../../../../img/partners/logo1.svg";
import styles from "./Notifications.module.scss";
import cn from "classnames";
import {Link} from "react-router-dom";

/*const notificate = {
    id:0,
    type: "action", 
    action:{action_id:1, img:`${actionimg}`,action_period:"1 ноября - 30 ноября",
        action_description:"При заказе латте - сэндвич за полцены!"}, 
    title: "Горячее предложение от HOTFIX! Успей попробовать", 
    message:"",
    sender:{sender_id:0, sender_logo:`${senderlogo1}`, sender_adress:"г.Минск пр-т Жукова 44"},
    date:new Date('Mon Nov 24 2022 10:16:36 GMT+0300 (Москва, стандартное время)')
}
*/
const NotificationItem = ({notificate}) =>{
    const monthes = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    return(
        <>
        {notificate.type === "order" 
        ?
        <div className = {cn(styles.notificate_container, styles.column_container)}>
            <div className = {styles.column1}> 
                <p className = {styles.notificate_title}>{notificate.title}</p>
                {notificate.message !== "" &&
                    <p className = {styles.notificate_message}>{notificate.title}</p>}
                <div className = {styles.notificate_date}>
                    <p>{notificate.date.getDate()} {monthes[notificate.date.getMonth()]} {notificate.date.getFullYear()}г.</p>
                    <p>{notificate.date.getHours()}:{notificate.date.getMinutes()}</p>
                </div>
            </div>
            <div className = {styles.column2}>
                <img src = {notificate.sender.sender_logo}/>
                {notificate.sender.sender_adress !== "" && <div className = {styles.sender_adress}>
                    {notificate.sender.sender_adress}
                </div>}

            </div>
        </div>
        :
        <div className = {styles.notificate_container}>
            <div className = {styles.notificate_title_container}>
                <p className = {styles.notificate_title}>{notificate.title}</p>
                {notificate.type === "system" && 
                <div className = {styles.logo_container}>
                    <img src = {notificate.sender.sender_logo}/>
                </div>}
            </div>
            {notificate.type === "action" && 
            <div className = {styles.action_container}>
                <img src = {notificate.action.img} className = {styles.action_img}/>
                <div className = {styles.action_period_container}>
                    <p className ={styles.action_period}>{notificate.action.action_period}</p>
                </div>
                <p className = {styles.action_description}>{notificate.action.action_description}</p>
            </div>
            }
            {notificate.type === "action" 
            ? 
            <Link to = "/partnerOffer">
                <div className = {styles.description_container}>
                    <p className = {styles.underline}>Перейти к предложению</p>
                </div>
            </Link>
            :
            <div className = {styles.description_container}>
                <p>{notificate.message}</p>
            </div>
            }
            <div className = {styles.notificate_date}>
                <p>{notificate.date.getDate()} {monthes[notificate.date.getMonth()]} {notificate.date.getFullYear()}г.</p>
                <p>{notificate.date.getHours()}:{notificate.date.getMinutes()}</p>
            </div>
        </div>

        }
        </>
    )
}

export default NotificationItem