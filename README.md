## Typeform To Facebook Messenger
A library to transform typeform questions to responses for Facebook messenger


### Usage
- `npm i` to install dependencies
- `npm t` to run the tests

#### To see the library in action:
- Set up a facebook page.
- Obtain the recipient PSID/ ADMIN_ID, this would be the ID of your facebook account, not the ID of the bot.
- Use postman to [simulate a request as described here](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)

The library translates several Typeform questions in a way that Facebook's Messenger can understand. The functions available are: 

```
  translateWelcomeScreen,
  translateShortText,
  translateLongText,
  translateNumber,
  translateStatement,
  translateYesNo,
  translateMultipleChoice,
  translateDropDown,
  translateEmail,
  translateOpinionScale,
  translateRatings,
  translatePictureChoice,
  translateDate,
  translateLegal,
```

Import them into your code:

```
const { translateShortText } = require('typeform-to-facebook-messenger')
```

To send a request to facebook messenger:
```
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": translateShortText(typeform.fields[0]) //e.g. if the first question from your Typeform form is of type "short_text"
  }
}
```