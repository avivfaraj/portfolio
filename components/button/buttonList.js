import Styles from "./button-list.module.css";
import Link from "next/link";

export default function ButtonList(props) {
  const { buttons } = props;

  return (
    <div className={Styles.test}>
      {buttons.map((button) => (
        <Link key={button.id} href={button.reference} target={button.target}>
          {button.name}
        </Link>
      ))}
    </div>
  );
}
