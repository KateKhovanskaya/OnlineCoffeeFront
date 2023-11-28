import React from 'react';

const ProductCardShort = () => {
  return (
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
                    <div><img src = {coins}></img></div>
                    <div className = {styles.coins}>{props.product.coins}</div>
                </div>
            </div>
        </div>
        
        <div className = {styles.productName}>
            {props.product.name}
        </div>

        {/* Этот блок показывать только, если в prpos указан relevance:false */}
    </div>
  );
};

export default ProductCardShort;