import styles from './modalWindow.module.scss'

const ModalWindow = ({children, visible, setVisible})=>{
    const rootClasses = [styles.myModal];
    if(visible){
        rootClasses.push(styles.active);
    }
    return(
        <div className = {rootClasses.join(' ')}
            onClick = {()=> setVisible(false)}>
            <div className = {styles.myModalContent}
                onClick = {(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default ModalWindow;