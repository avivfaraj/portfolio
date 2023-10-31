{
  /*Credit to Maximilian schwarzmueller (NextJS Udemy course):
https://github.com/mschwarzmueller/nextjs-course-code/blob/09-context/components/ui/notification.js
*/
}
import { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "/store/notification-context";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
