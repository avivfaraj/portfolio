import ContactForm from "/components/contact/contact-form";
import { Fragment } from "react";
import Head from "next/head";

function Contact() {
  return (
    <Fragment>
      <Head>
        <title> Aviv Faraj | Data Scientist</title>
        <meta
          name="description"
          content="Sharing personal projects in programming, data science and electrical engineering"
        />
      </Head>

      <ContactForm />
    </Fragment>
  );
}

export default Contact;
