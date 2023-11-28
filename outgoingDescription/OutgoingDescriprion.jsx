import React, { useState } from 'react';
import styles from "./OutgoingDescription.module.scss";
import cn from 'classnames'

const OutgoingDescription = ({description})=>{

    const [isActiveInformation, setisActiveInformation] = useState(false)
    const [showInformation, setshowInformation] = useState({
      title: 'показать',
    })
    const showInfo = () =>
      setshowInformation({
        title: 'показать',
      })
    const hideInfo = () =>
      setshowInformation({
        title: 'скрыть',
      })

    return(
        <>
            <div className = {styles.description_label}
                onClick={() => setisActiveInformation(!isActiveInformation)}>

            </div>
            <div
                className={cn(
                styles.information,
                !isActiveInformation ? styles.activeInfo : styles.pasiveInfo
                )}
            >
                <div
                    onClick={(e) => {
                        if (e.target !== e.currentTarget) {
                        return
                        }
                        setisActiveInformation(!isActiveInformation)
                    }}
                    className={cn(
                        styles.informationMain,
                        // showInformation.title === 'показать' ? styles.informationhide : ''
                    )}
                >
                    {description.length > 158 && showInformation.title === 'показать'? `${description.substring(0,158)}...`: description}
                </div>
                {description.length > 158 && <p
                    className={styles.informationLabel}
                    onClick={() =>
                        showInformation.title === 'скрыть' ? showInfo() : hideInfo()
                    }
                >
                    {showInformation.title}
                </p>}
            </div>
        </>
    )
}

export default OutgoingDescription;