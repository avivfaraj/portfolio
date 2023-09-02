import Styles from "./gif.module.css";

export default function GIF(props) {
    const { id, title, src } = props;
    return <img id={id} src={src} title={title} className={Styles.gif} />;
}
