import Styles from "./button-list.module.css";
import Link from "next/link";

export default function ButtonList({ buttons }) {
  return (
    <div className={Styles.test}>
      {buttons.map((button) => (
        <Link key={button.id} href={button.reference}>
          {button.name}
        </Link>
      ))}
    </div>
  );
}
