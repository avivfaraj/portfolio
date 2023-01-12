import Styles from "/styles/gif.module.css"

export default function GIF({id, title, src}){
  return(

      <img id={id} src={src} title={title} className={Styles.gif}/>
    );
}
