import { useState, useRef, useContext } from "react";
import Styles from "./contact-form.module.css";
import { useRouter } from "next/router";
import NotificationContext from "../../store/notification-context";

function ContactForm() {
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const contentInputRef = useRef();
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const [isEmailValid, setEmailValid] = useState(true);
  const [isName, setName] = useState(true);
  const [isContent, setContent] = useState(true);

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredContent = contentInputRef.current.value;

    // Below validation is optional.
    // Most browser cover that with the 'required' argument passed to html elements
    if (!enteredEmail.includes("@")) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }

    if (!enteredName) {
      setName(false);
    } else {
      setName(true);
    }

    if (!enteredContent) {
      setContent(false);
    } else {
      setContent(true);
    }

    if (isEmailValid && isName && isContent) {
      fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ enteredName, enteredEmail, enteredContent }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        })
        .then((data) => {
          notificationCtx.showNotification({
            title: "Success!",
            message: "Message was sent!",
            status: "success",
          });
          router.replace("/");
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: "Error!",
            message: "Something went wrong!",
            status: "error",
          });
        });

      // const data = await response.json();
      // setResponseCode(response.status);
      // Ensure Email sent
      // if (response.status === 200) {
      //   router.replace("/");
      // }
    }
  }

  return (
    <section className={Styles.contact}>
      <h1>Contact</h1>

      <form className={Styles.form} onSubmit={submitHandler}>
        <div className={`${Styles.col} "col-md" "input-group has-validation"`}>
          <div className={Styles.input}>
            <div
              className={
                isEmailValid ? "form-floating" : "form-floating is-invalid"
              }
            >
              <input
                required
                type="email"
                className={
                  isEmailValid ? "form-control" : "form-control is-invalid"
                }
                id="email"
                ref={emailInputRef}
              />
              <label htmlFor="email">Email address</label>
            </div>
            {!isEmailValid && (
              <div className="invalid-feedback">
                Please enter a valid email address
              </div>
            )}
          </div>

          <div className={Styles.input}>
            <div
              className={isName ? "form-floating" : "form-floating is-invalid"}
            >
              <input
                required
                type="text"
                pattern="[A-Za-z ]*"
                className={isName ? "form-control" : "form-control is-invalid"}
                id="fullName"
                ref={fullNameInputRef}
              />
              <label htmlFor="fullName">Full Name (Alphabet Letters)</label>
            </div>
            {!isName && (
              <div className="invalid-feedback">Full name is required!</div>
            )}
          </div>

          <div className={Styles.input}>
            <div
              className={
                isContent ? "form-floating" : "form-floating is-invalid"
              }
            >
              <textarea
                required
                className={
                  isContent ? "form-control" : "form-control is-invalid"
                }
                id="msg"
                style={{ height: "300px" }}
                rows="5"
                ref={contentInputRef}
              />
              <label htmlFor="msg">Message</label>
            </div>

            {!isContent && (
              <div className="invalid-feedback">Message is required!</div>
            )}
          </div>

          <div className={Styles.actions}>
            <div className={` "form-floating"`}>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className={Styles.gap}></div>
    </section>
  );
}

export default ContactForm;
