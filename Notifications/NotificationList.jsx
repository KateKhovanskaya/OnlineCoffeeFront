import actionimg from "../../../../img/specials/special5.jpg";
import senderlogo1 from "../../../../img/partners/logo1.svg";
import styles from "./Notifications.module.scss";
import cn from "classnames";
import logo from "../../../../img/mainlogo.svg";
import NotificationItem from "./NotificationItem";

const notificates = [{
    id:0,
    type: "action", 
    action:{action_id:1, img:`${actionimg}`,action_period:"1 ноября - 30 ноября",
        action_description:"При заказе латте - сэндвич за полцены!"}, 
    title: "Горячее предложение от HOTFIX! Успей попробовать", 
    message:"",
    sender:{sender_id:0, sender_logo:`${senderlogo1}`, sender_adress:"г.Минск пр-т Жукова 44"},
    date: new Date('Mon Nov 24 2022 10:16:36 GMT+0300 (Москва, стандартное время)')
},
{
    id:1,
    type: "order", 
    title: "Ваш заказ принят!", 
    message:"",
    sender:{sender_id:0, sender_logo:`${senderlogo1}`, sender_adress:"г.Минск пр-т Жукова 44"},
    date: new Date('Mon Dec 05 2022 16:18:36 GMT+0300 (Москва, стандартное время)')
},
{
    id:2,
    type: "system", 
    title: "Система не будет работать с 06:00 до 07:00.", 
    message:"Будут проводиться технические работы. Приносим извинения за неудобства.",
    sender:{sender_id:1, sender_logo:`${logo}`, sender_adress:""},
    date: new Date('Mon Dec 15 2022 16:18:36 GMT+0300 (Москва, стандартное время)')
}]

const NotificationList = () =>{
    
    return(
        <>
        {notificates.map((item)=>(
            <NotificationItem key={item.id} notificate = {item}/>
        ))}
        </>
    )
}
export default NotificationList;