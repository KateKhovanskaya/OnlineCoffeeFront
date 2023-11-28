import React, {useState, useRef} from 'react';
import cn from "classnames";
import { Navigation, Pagination } from "swiper";
import Slider from "../common/Slider/Slider";
import fon from "../../img/fon.svg";
import fon2 from "../../img/specials/special1.svg";
import "./productCards-swiper.scss";
import styles from "./productcardDetail.module.scss";
import coins from "../../img/coins.svg";
import {ReactComponent as CoffeeWhite} from "../../img/icons/coffeWhite.svg";
import CoffeeCup from "../../img/icons/cup-fill.svg";
import cinnamon from '../../img/products/cinnamon.png';
import sortImg from '../../img/products/arabica.png';
import oneCup from '../../img/products/oneCup.png';
import threeCups from '../../img/products/threeCups.png';
import { Footer } from '../Main/Footer/Footer'


  const coffecards = [{id:1, name:"Espresso", price: 1.90, currency: "BYN", coins: 12, img:"http://localhost:3000/static/media/espresso.42b038ecbf94978d4d0e.png", relevance:true},
  {id:2, name:"Американо", price: 2.30, currency: "BYN", coins: 17, img:"http://localhost:3000/static/media/americano.0f9a4945bbb24bc9c877.png", relevance:true},
  {id:3, name:"Капучино", price: 2.50, currency: "BYN", coins: 19, img:"http://localhost:3000/static/media/americano.0f9a4945bbb24bc9c877.png", relevance:true}];

  const sprinklingList = [{id:1, name:"Корица", price:0, img:`${cinnamon}`,relevance:true},
                          {id:2, name:"Шоколад", price:0.40, img:`${cinnamon}`, relevance:true},
                          {id:3, name:"Малиновая", price:0.70, img:`${cinnamon}`, relevance:true},
                          {id:4, name:"Клюква", price:0.70, img:`${cinnamon}`, relevance:true},
                          {id:5, name:"Кокосовая", price:0.70, img:`${cinnamon}`, relevance:true}]

  const coffeeSortList = [{id:1, name: "Арабика", price:0, img:`${sortImg}`, relevance: true},
                          {id:2, name: "Робуста", price:1.00, img:`${sortImg}`, relevance: true},
                          {id:3, name: "Либерика", price:1.50, img:`${sortImg}`, relevance: true},]

  const countCards = [{id:1, name:"1", price:1, img:`${threeCups}`, relevance: true},
                      {id:2, name:"2", price:2, img:`${threeCups}`, relevance: true},
                      {id:3, name:"3", price:3, img:`${threeCups}`, relevance: true},
                      {id:4, name:"4", price:4, img:`${threeCups}`, relevance: true},
                      {id:5, name:"5", price:5, img:`${threeCups}`, relevance: true},]
const ProductCardDetail = () => {
  const [activeId, setActiveId] = useState(1);
  const activeIndex = coffecards.findIndex(function(el){
    return el.id === activeId;
  });


  const [state, setState] = useState({
    id:'',
    name: '',
    price: 0,
    currency: '',
    coins: 0,
    strong: 3,
    volume:200,
    sprinkling_id:2,
    coffee_sort:2,
    sirope:'',
    count:5,
    milk: 0,
    sugar:0,
  });

  function handleChange(name, value) {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

   function mySlideChange(activeIndex) {
        setActiveId(coffecards[activeIndex].id);
    }
  return (
    <div>
      <Slider
        loop={true}
        spaceBetween={0}
        modules={[Navigation, Pagination]}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
        grabCursor={true}
        className="card-images-slider slider"
        initialSlide = {activeIndex}
        onSlideNextTransitionEnd={(s) => {mySlideChange(s.realIndex)}}
        onSlidePrevTransitionEnd={(s) => {mySlideChange(s.realIndex)}}
      >
        {coffecards.map((item, index) => (
          <ImgWithPrice key={index} product= {item} />
        ))}
      </Slider>

      <div className = {styles.productName_container}>
        <p>{coffecards[activeIndex].name}</p>
        <div className = {styles.coinsstrong_container}>
          {[1,2,3,4,5].map((value)=>(
              (state.strong >= value && 
              <CoffeeWhite key={value} width = {30} height = {30} 
                className = {styles.brouncoin}
                onClick={()=>{handleChange('strong', value)}}/>)||
              (state.strong < value && 
              <CoffeeWhite key={value} width = {30} height = {30}
              onClick={()=>{handleChange('strong', value)}}/>)
              ))}
        </div>
      </div>

      <div className = {styles.main_volume_container}>
        {[200,300,400].map((value)=>(
          (state.volume == value && <VolumeCup
          key = {value} volume =  {value}
          onClick={()=>{handleChange('volume', value)}}/>)||
          (state.volume != value && <VolumePoint
          key = {value} volume = {value} 
          onClick={()=>{handleChange('volume', value)}}/>)
        ))
        }
      </div>
      
      <div className = {styles.additional_ingredients}>
        {state.sprinkling_id != 0 && <OrderDetailsItem ingredient={{id:state.sprinkling_id, 
        ingredientCategory:'Посыпка', list:sprinklingList}}/>}
        <OrderDetailsItem ingredient={{id:state.coffee_sort, 
        ingredientCategory:'Сорт кофе', list:coffeeSortList}}/>
        <OrderDetailsItem ingredient={{id:state.count, 
        ingredientCategory:'Заказ', list:countCards}}/>
      </div>
      
      <div className = {styles.changeIngredient_box}>
        {sprinklingList.map((ingred)=>(
          <IngredientItem key = {ingred.id} ingredient = {ingred} 
          onClick={()=>{handleChange('sprinkling_id', ingred.id)}}/>
        ))}
      </div>

      <Footer/>
    </div>
  );
};


export default ProductCardDetail;



const ImgWithPrice =(props)=>{

  return(
    <div className = {styles.productCard_container}>
      <div className = {styles.productImg_container} style = {{backgroundImage:`url(${props.product.img})`}}>
          <div className = {`${styles.price_row} ${styles.row1}`}>
              <div className = {styles.price_currency_container}>
                  <div className = {styles.price_currency}>{props.product.price.toFixed(2)}</div>
                  <div className = {styles.currency}>{props.product.currency}</div>
              </div>
          </div>
          <div  className = {`${styles.price_row} ${styles.row2}`}>
              <div className = {styles.price_bonuce_container}>
                  <div className = {styles.coins_container}>
                    <img src = {coins}></img>
                  </div>
                  <div className = {styles.coins}>{props.product.coins}</div>
              </div>
          </div>
      
      </div>
    </div>
  )
}

const VolumeCup = (props) => {
  return(
    <div className = {styles.volume_container} onClick = {props.onClick}>
          <div class = {styles.volume_cup_img}>
            <img src = {CoffeeCup}/>
            <div className = {styles.whiteLine}></div>
          </div>
          <div className = {cn(styles.volume_text, styles.volume_text_active)}>{props.volume} мл</div>
    </div>
  )
}

const VolumePoint = (props) => {
  return(
    <div className = {styles.volume_container} onClick = {props.onClick}>
          <div class = {styles.volume_point_container}>
            <div class = {styles.volume_point}></div>
            <div className = {styles.whiteLine}></div>
          </div>
          <div className = {styles.volume_text}>{props.volume} мл</div>
          
        </div>
  )
}

const OrderDetailsItem =(props)=>{
  const activeIngredientIndex = props.ingredient.list.findIndex(function(el){
    return el.id === props.ingredient.id;
  });
  return(
    <div className = {styles.orderDetailsItem_container}>
    <div className = {cn(`${props.ingredient.ingredientCategory}` != 'Посыпка' && styles.hidden, styles.delete_ingredient)} onClick = {props.onClick}>
      <div className = {styles.minus}></div>
    </div>
    <div className = {cn(styles.price_of_ingredient_box, `${props.ingredient.ingredientCategory}` == 'Заказ' && styles.hidden)}>
      <p>+ {props.ingredient.list[activeIngredientIndex].price}</p>
      <p>Br</p>
    </div>
    <img src={props.ingredient.list[activeIngredientIndex].img} alt="cinnamon" className = {styles.ingredientImg}/>
    <div className = {styles.ingredient_categoryName}>{props.ingredient.ingredientCategory}</div>
    <div className = {styles.ingredient_name}>{props.ingredient.list[activeIngredientIndex].name}
    <span className = {`${props.ingredient.ingredientCategory}` != 'Заказ' && styles.hidden}> шт</span></div>
  </div>
  )
}

const ChangeIngredient=(props)=>{
  
  return(
    <div className = {styles.changeIngredient_box}>
      {props.ingredientList.map((ingred)=>(
        // <div key = {ingred.id}>{ingred.name}</div>
        <IngredientItem key = {ingred.id} ingredient = {ingred} 
        onClick = {props.onClick}/>
      ))}
    </div>
  )
}

const IngredientItem = (props)=>{
  return(
    <div className = {styles.ingredientItem_box} onClick = {props.onClick}>
      <div className = {styles.price_of_ingredient_box}>
        <p>+ {props.ingredient.price}</p>
        <p>Br</p>
      </div>
      <img src={props.ingredient.img} alt="" className = {styles.ingredientImg}/>
      <div className = {styles.ingredientItem_name}>{props.ingredient.name}</div>
    </div>
  )
}