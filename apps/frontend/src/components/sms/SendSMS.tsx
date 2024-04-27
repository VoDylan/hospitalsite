import { Twilio } from "twilio";

const accountSid = 'ACcdf0db382c3d07ac03d14acf72538a9a';
const authToken = '1993739fd8d4b6d5279153dfc6797f45';
const twilioNumber = '+18457292533';
const myNumber = '+18667816473';

export default function sendSMS() {
  if (accountSid && authToken && myNumber && twilioNumber) {
    const client = new Twilio(accountSid, authToken);

    client.messages
      .create({
        from: twilioNumber,
        to: myNumber,
        body: "You just sent an SMS from TypeScript using Twilio!",
      })
      .then((message) => console.log(message.sid));
  } else {
    console.error(
      "You are missing one of the variables you need to send a message"
    );
  }
}

