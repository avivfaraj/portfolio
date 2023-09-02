import Button from "./button";
import Styles from "./button.module.css";

export default function ButtonList({ buttons }) {
  return (
    <div className={Styles.test}>
      {buttons.map((button) => (
        <Button {...button} />
      ))}
    </div>
  );
}
