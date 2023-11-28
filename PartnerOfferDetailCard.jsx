import React, {useEffect, useState} from 'react';
import { topping, toppingName } from './MainScreen/dataFake';
import { useNavigate } from "react-router";
import styles from './style.module.scss';
import cn from "classnames";
import arrow from "./img/icons/arrow.svg";
import latte from './img/menu/latte.png';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import sendwich from '../../../img/menu/sendwich.png';
import { SizeCup } from '../SizeCup/SizeCup';
import { SmallCardProduct } from '../SmallCardProduct/SmallCardProduct';
import { ToppingModal } from '../ToppingModal/ToppingModal';
import Grain from '../../../img/mainscreen/grainLogo.png';
import syrups1 from '../../../img/mainscreen/temp/Банан.png'
import Cinnamon from '../../../img/mainscreen/cinnamonLogo.png';
import Cup from '../../../img/mainscreen/cupLogo.png';
import FullList from '../../Menu/MenuCategory/FullList/FullList';
import tableItemsStyles from '../../Menu/MenuCategory/MenuCategory.module.scss';
import { Footer } from '../../Main/Footer/Footer';
import WhiteButton from '../../common/buttons/WhiteButton';
import { BasketAccordionMeny } from '../BasketAccordionMeny/BasketAccordionMeny';
import GrayButton from '../../common/buttons/GrayButton'
import { getAuth } from "../../../redux/thunk/async/get-auth";
import ModalWindow from '../../common/ModalWindows/modalWindow';
import OutgoingDescription from "../../common/outgoingDescription/OutgoingDescriprion";

const PartnerOfferDetailCard = (props)=>{
    const user = {id:0}
    // const myUser = useSelector(state => state.auth.auth);
    // console.log(myUser);

    const partner = {id:0, name: "HOTFIX", address:"Минск, пр-т Жукова, 44"}
    const products = {
        categoriesItem: {
          food: [
            { id:50, name: 'Сендвич c курицей гриль', image: sendwich, points: 0, vg: '1.90', discount:0.5, description:"очень вкусно"},
            { id:16, name: 'Сендвич c ветчиной', image: sendwich, points: 0, vg: '1.90', discount:0.5, description:""},
            { id:42, name: 'Сендвич c бужениной', image: sendwich, points: 0, vg: '2.90', discount:0.5, description:null},
            { id:38, name: 'Сендвич c салями', image: sendwich, points: 0, vg: '2.90', discount:0.5}
          ],
        },
      
        coffee: [
          { name: 'Латте', image: latte, points: 12, vg: '1.90', id: 4, discount:0 },
        ],
    }
    const drinkVolumeList = [200,300,400];
    const foodCountList = [1,2,3,4];
    const navigate = useNavigate();
    const { cup, sprinkling, coffee, syrups } = topping
    const [sprinklingModalActive, setSprinklingModalActive] = useState(false)
    const [cupModalActive, setCupModalActive] = useState(false)
    const [coffeeModalActive, setCoffeeModalActive] = useState(false)
    const [syrupsModalActive, setSyrupsModalActive] = useState(false)
    // const [isChecked, setIsChecked] = useState(false)
    // const [coffeeId, setCoffeeId]=useState(products.coffee[0].id)
    // const [sandwitchId, setSandwitchId]=useState(products.categoriesItem.food[0].id)
    // const [drinkVolume, setDrinkVolume] = useState(drinkVolumeList[0])
    // const [foodCount, setfoodCount] = useState(foodCountList[0])
    const [offerToBasket, setOfferToBasket] = useState({
        user: {email:user.id},
        cafe:{id:partner.id, 
            logo_url:"", 
            cafe_photo:[], 
            rating:0.0,tags: [],
            name: partner.name,
            address: partner.address,
            phone: "+375 25",
            work_time_open: "06:35:35.858261",
            work_time_closed: "06:35:35.852277"},
        product:null,
        coffee:{id: 0,
            product: {
                id: 0,
                product_photo: [],
                final_price: 0,
                name: "0",
                price: "0",
                price_in_words: "0",
                price_bonus: 0,
                available: true,
                discount_percentage: 0,
                discount_savings: " ",
                description: "",
                category: 1,
                sub_category: 1
            },
            variety: [],
            dressing: [{}],
            syrups: [{}],
            strength: 3,
            cup_size: "",
            quantity: 200,
            own_cup: false,
            milk: false,
            sugar: false,
            portions: 1},
        food: {
            id: 0,
            product: {
                id: 0,
                product_photo: [],
                final_price: 0,
                name: "",
                price: "",
                price_in_words: "",
                price_bonus: 0,
                available: true,
                discount_percentage: 0,
                discount_savings: "",
                description: "",
                category: 2,
                sub_category: 4
            },
            reheat_option: false
        },
        date: new Date()
      })

      const [drinkItem, setDrinkItem] = useState({
        drink_id: products.coffee[0].id,
        myCup:false,
        coffeeStrength:4,
        drinkVolume:drinkVolumeList[0],
        coffeeSort:'Арабика',
        sprinkling_name:'',
        sirope:'',
        milk:false,
        sugar:false,
        cupCount:1,
    })
    
    const [foodItem, setFoodItem] = useState({
        food_id: products.categoriesItem.food[0].id,
        foodCount:foodCountList[0],

    })

      function handleChangeDrink(name, value) {
        setDrinkItem((prev) => ({
          ...prev,
          [name]: value,
        }));
        console.log(drinkItem);
      }
      function handleChangeFood(name, value) {
        setFoodItem((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    useEffect(()=>{
        handleChangePrice();
    },[drinkItem, foodItem])

    useEffect(()=>{
        console.log("offerToBasket POST")
        console.log(offerToBasket); 
      },[offerToBasket])

    const[orderPrice, setOrderPrice]=useState(
        (Number(products.coffee[products.coffee.findIndex(e=>e.id ===drinkItem.drink_id)].vg)+Number(products.categoriesItem.food[products.categoriesItem.food.findIndex(e=>e.id === foodItem.food_id)].vg)*(1-products.categoriesItem.food[products.categoriesItem.food.findIndex(e=>e.id === foodItem.food_id)].discount)).toFixed(2))
    
        function handleChangePrice(){
        var drink_item = products.coffee[products.coffee.findIndex(e=>e.id ===drinkItem.drink_id)];
        var food_item = products.categoriesItem.food[products.categoriesItem.food.findIndex(e=>e.id === foodItem.food_id)];
        var coffeeFinalPrice = Number(drink_item.vg)+topping.coffee.item[topping.coffee.item.findIndex(e=>e.name === drinkItem.coffeeSort)].price;
        if(drinkItem.sprinkling_name!=="" && drinkItem.sprinkling_name!=="Oтмена"){
            coffeeFinalPrice+=topping.sprinkling.item[topping.sprinkling.item.findIndex(e=>e.name === drinkItem.sprinkling_name)].price;
        }
        if(drinkItem.sirope!=="" && drinkItem.sirope!=="Oтмена"){
            coffeeFinalPrice+=topping.syrups.item[topping.syrups.item.findIndex(e=>e.name ===drinkItem.sirope)].price;
        }
        var foodFinalPrice = Number(food_item.vg)*(1-food_item.discount);
        var orderFinalPrice = (coffeeFinalPrice*drinkItem.cupCount + foodFinalPrice*foodItem.foodCount).toFixed(2);
        // console.log("coffeeFinalPrice " + coffeeFinalPrice*drinkItem.cupCount);
        // console.log("foodFinalPrice " + foodFinalPrice);
        setOrderPrice(orderFinalPrice);
    }

      function handleOffer(){
        var drink_index = products.coffee.findIndex(e=>e.id ===drinkItem.drink_id);
        var dressing = {};
        if(drinkItem.sprinkling_name!=="" && drinkItem.sprinkling_name!=="Oтмена"){
            var dressing_item = topping.sprinkling.item[topping.sprinkling.item.findIndex(e=>e.name === drinkItem.sprinkling_name)];
            dressing = {
                "id":0,
                "name": dressing_item.name,
                "url_firebase": dressing_item.image,
                "price": dressing_item.price,
                "dressing": 0
            }
        }
        var syrope = {};
        if(drinkItem.sirope!=="" && drinkItem.sirope!=="Oтмена"){
            var syrope_item = topping.syrups.item[topping.syrups.item.findIndex(e=>e.name ===drinkItem.sirope)];
            syrope = {
                "id": 0,
                "name": syrope_item.name,
                "url_firebase": syrope_item.image,
                "price": syrope_item.price,
                "syrups": 0
            }
        }
        var food_item = products.categoriesItem.food[products.categoriesItem.food.findIndex(e=>e.id === foodItem.food_id)]
        setOfferToBasket((prev)=>({
            ...prev,
            "coffee":{
                "product":{
                    "id":drinkItem.drink_id,
                    "product_photo":products.coffee[drink_index].image,
                    "final_price": Number(products.coffee[drink_index].vg)*(1-products.coffee[drink_index].discount),
                    "name":products.coffee[drink_index].name,
                    "price":Number(products.coffee[drink_index].vg),
                    "price_in_words":"",
                    "price_bonus":0,
                    "available": true,
                    "discount_percentage":products.coffee[drink_index].discount*100,
                    "discount_savings":Number(products.coffee[drink_index].vg)*products.coffee[drink_index].discount,
                    "description":"",
                    "category": 1,
                    "sub_category": 1
                },
                "variety": [],
                "dressing":[{dressing}],
                "syrups":[{syrope}],
                "strength":drinkItem.coffeeStrength,
                "cup_size": "",
                "quantity":drinkItem.drinkVolume,
                "own_cup": drinkItem.myCup,
                "milk": drinkItem.milk,
                "sugar": drinkItem.sugar,
                "portions": drinkItem.cupCount,
            },
            "food":{
                "product":{
                    "id":food_item.id,
                    "product_photo":[food_item.image],
                    "final_price":Number(food_item.vg)*(1-food_item.discount),
                    "name":food_item.name,
                    "price":food_item.vg,
                    "price_in_words": "",
                    "price_bonus": 0,
                    "available": true,
                    "discount_percentage":food_item.discount*100,
                    "discount_savings":Number(food_item.vg)*food_item.discount,
                    "description": "",
                    "category": 2,
                    "sub_category": 4
                }
            }
        }));
        console.log("SetOfferToBascet done");  
      }
    const tooogleSprinkling = () => {
    setSprinklingModalActive(!sprinklingModalActive)
    }
    const tooogleCup = () => {
    setCupModalActive(!cupModalActive)
    }
    const tooogleCoffee = () => {
    setCoffeeModalActive(!coffeeModalActive)
    }
    const tooogleSyrups = () => {
    setSyrupsModalActive(!syrupsModalActive)
    }

    return(
        <>
            <div className={styles.titleContainer}>
                <button onClick={() => navigate(-1)} className={styles.back}>
                        <img src={arrow} alt="Вернуться назад" />
                </button>
                <div className={styles.title}>
                    <h2>{partner.name}</h2>
                    <p>{partner.address}</p>
                </div>
            </div>
            <ProductsSlider menuItems = {products.coffee} category = "coffee"
            activeId = {drinkItem.drink_id} changedParametr = "drink_id" setActiveId = {handleChangeDrink}/>
    
            <SizeCup sizeList = {drinkVolumeList} 
                unit = "ml" 
                selectedSize = {drinkItem.drinkVolume} 
                setSelectedSize = {handleChangeDrink}
                name = "drinkVolume"/>

            <div className={styles.topingWrapper}>
            {drinkItem.sprinkling_name !=='' && drinkItem.sprinkling_name !=="Oтмена" && <SmallCardProduct
                    label="Посыпка"
                    sublabel={drinkItem.sprinkling_name}
                    image = {topping.sprinkling.item[topping.sprinkling.item.findIndex(e=>e.name ===drinkItem.sprinkling_name)].image}
                    price={`+ ${topping.sprinkling.item[topping.sprinkling.item.findIndex(e=>e.name ===drinkItem.sprinkling_name)].price}`}
                    click={() => setSprinklingModalActive(!sprinklingModalActive)}
                />}
                <SmallCardProduct
                    label="Сорт кофе"
                    sublabel={drinkItem.coffeeSort}
                    image={Grain}
                    price={`+ ${topping.coffee.item[topping.coffee.item.findIndex(e=>e.name ===drinkItem.coffeeSort)].price}`}
                    click={() => setCoffeeModalActive(!coffeeModalActive)}
                />
                {drinkItem.sirope !=='' && drinkItem.sirope !=="Oтмена" && <SmallCardProduct
                    label="Сироп"
                    sublabel={drinkItem.sirope}
                    // image={syrups1}
                    image = {topping.syrups.item[topping.syrups.item.findIndex(e=>e.name ===drinkItem.sirope)].image}
                    price={`+ ${topping.syrups.item[topping.syrups.item.findIndex(e=>e.name ===drinkItem.sirope)].price}`}
                    click={() => setSyrupsModalActive(!syrupsModalActive)}
                />}
                <SmallCardProduct
                    label="Заказ"
                    sublabel={drinkItem.cupCount}
                    image = {topping.cup.item[topping.cup.item.findIndex(e=>e.name ===drinkItem.cupCount)].image}
                    price={(Number(products.coffee[products.coffee.findIndex(e=>e.id ===drinkItem.drink_id)].vg)*drinkItem.cupCount).toFixed(2)}
                    click={() => setCupModalActive(!cupModalActive)}
                />
            </div>
            <div className={styles.topingButtonContainer}>
                {/* {toppingName.map((name, index) => (
                <div className={styles.topingButton} key={index}>
                    <p>+</p>
                    <p>{name}</p>
                </div>
                ))} */}
                <div className={cn(styles.topingButton, drinkItem.sirope !=='' && drinkItem.sirope !=="Oтмена" && styles.active)}
                 onClick={() => setSyrupsModalActive(!syrupsModalActive)}>
                    <p>+</p>
                    <p>Сироп</p>
                </div>
                <div className={cn(styles.topingButton, drinkItem.milk && styles.active)}
                 onClick={() => handleChangeDrink("milk", !drinkItem.milk)}>
                    <p>+</p>
                    <p>Молоко</p>
                </div>
                <div className={cn(styles.topingButton, drinkItem.sugar && styles.active)}
                 onClick={() => handleChangeDrink("sugar", !drinkItem.sugar)}>
                    <p>+</p>
                    <p>Сахар</p>
                </div>
                <div className={cn(styles.topingButton, drinkItem.sprinkling_name !=='' && drinkItem.sprinkling_name !=="Oтмена" && styles.active)}
                 onClick={() => setSprinklingModalActive(!sprinklingModalActive)}>
                    <p>+</p>
                    <p>Посыпка</p>
                </div>
            </div>
            <ModalWindow visible = {cupModalActive} setVisible = {setCupModalActive}>
                <ToppingModal
                    topingData={cup}
                    closeModal={tooogleCup}
                    openmodal={cupModalActive}
                    ingredient = "cupCount"
                    setIngredient = {handleChangeDrink}
                /> 
            </ModalWindow>
          
            <ModalWindow visible = {sprinklingModalActive} setVisible = {setSprinklingModalActive}>
                <ToppingModal
                    topingData={sprinkling}
                    closeModal={tooogleSprinkling}
                    openmodal={sprinklingModalActive}
                    ingredient = "sprinkling_name"
                    setIngredient = {handleChangeDrink}
                />
            </ModalWindow>
            
            <ModalWindow visible = {coffeeModalActive} setVisible = {setCoffeeModalActive}>
                <ToppingModal
                    topingData={coffee}
                    closeModal={tooogleCoffee}
                    openmodal={coffeeModalActive}
                    ingredient = "coffeeSort"
                    setIngredient = {handleChangeDrink}
                />
            </ModalWindow>
            
            <ModalWindow visible = {syrupsModalActive} setVisible = {setSyrupsModalActive}>
                <ToppingModal
                    topingData={syrups}
                    closeModal={tooogleSyrups}
                    openmodal={syrupsModalActive}
                    ingredient = "sirope"
                    setIngredient = {handleChangeDrink}
                />
            </ModalWindow>
            <input
                className={styles.customCheckbox}
                id="myCheckbox"
                type="checkbox"
                checked={drinkItem.myCup}
                onChange={(event) => handleChangeDrink("myCup", event.target.checked)}
            />
            <label htmlFor="myCheckbox">My cup please</label>
            <ProductsSlider menuItems = {products.categoriesItem.food}
                activeId = {foodItem.food_id} changedParametr = "food_id" setActiveId = {handleChangeFood}/>
            <section className={tableItemsStyles.menuCategory}>
                <FullList
                    item = {products.categoriesItem}
                    selectedCategory="food"
                    activeId = {foodItem.food_id}
                    // setActiveId = {setSandwitchId}
                    />
            </section>
            <SizeCup sizeList = {foodCountList}
                unit = "шт" 
                selectedSize = {foodItem.foodCount}
                setSelectedSize = {handleChangeFood}
                name = "foodCount"/>
            <WhiteButton text={`Добавить в корзину (${orderPrice} Br)`} onClick = {()=>handleOffer()}/>
            <BasketAccordionMeny image={latte} />
            <div className={styles.buttonContainer}>
                <GrayButton text="Oплатить" />
                <WhiteButton text="Продолжить" />
            </div>
            <Footer/>
        </>
    )
}

export default PartnerOfferDetailCard;