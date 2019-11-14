const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
    res.send(
    "<h1 style='text-align: center'>zsááááááááááááááááááááááác <br><br>😃👻😃👻😃👻😃👻😃</h1>"
);
});

app.post("/sendmail", (req, res) => {
    console.log("request came");
let user = req.body;
console.log(user);
sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
res.send(info);
});
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: details.email,
            pass: details.password
        }
    });

    let mailOptions = {
        from: `${user.emailaddress}`, // sender address
        to: 'tisaaaful@gmail.com', // list of receivers
        subject: `${user.subject}`, // Subject line
        html: `<h1>${user.subject}</h1>
            
       
<br>
              <h4>${user.message}</h4>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

// main().catch(console.error);