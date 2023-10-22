import { useState, useRef } from "react";
import Styles from "./contact-form.module.css";

function ContactForm() {
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const contentInputRef = useRef();

  const [isEmailValid, setEmailValid] = useState(true);
  const [isName, setName] = useState(true);
  const [isContent, setContent] = useState(true);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredContent = contentInputRef.current.value;

    console.log("Name: " + enteredName);
    console.log("Email: " + enteredEmail);
    console.log("Content: " + enteredContent);

    // optional: Add validation
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
