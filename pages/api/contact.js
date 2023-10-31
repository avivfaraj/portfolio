async function handler(req, res) {
  if (req.method === "POST") {
    {
      /*Credit to Elyssa Winch (Medium Article):
        https://medium.com/nerd-for-tech/coding-a-contact-form-with-next-js-and-nodemailer-d3a8dc6cd645 */
    }
    let nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.sender,
        pass: process.env.password,
      },
      secure: true,
    });
    const mailData = {
      from: process.env.sender,
      to: process.env.receiver,
      subject: `Message From ${req.body.enteredName} (Portfolio Website)`,
      text: req.body.enteredContent + " | Sent from: " + req.body.enteredEmail,
      html: `<div>${req.body.enteredContent}</div><p>Sent from:
    ${req.body.enteredEmail}</p>`,
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err) res.status(500).json({ message: err});
      else res.status(200).json({ message: "Sent" });
    });
    return;
  }
}
export default handler;
