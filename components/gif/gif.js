import Styles from "./gif.module.css";

export default function GIF(props) {
  const { id, title, src } = props;

  // TODO: Replace img with Image.
  return (
    <div className={Styles.container}>
      <img id={id} src={src} title={title} className={Styles.gif} />
    </div>
  );
}
