const translateShortText = (data) => {
  return { text: data.title }
}
//welcome_screen
const translateWelcomeScreen = (data) => {
  const response = translateShortText(data)
  response.quick_replies = [
    {
      content_type: 'text',
      title: data.properties.button_text,
      payload: data.properties.button_text,
    },
  ]
  return response
}

//short_text

const translateLongText = translateShortText

const translateNumber = translateShortText

const translateDate = translateShortText

//statement to quick reply
const translateStatement = (data) => {
  const response = translateShortText(data)
  response.quick_replies = [
    {
      content_type: 'text',
      title: data.properties.button_text,
      payload: data.properties.button_text,
    },
  ]
  return response
}

//multiple_choice
const translateMultipleChoice = (data) => {
  //translate TF multiple choice to FB template with buttons
  const response = {}
  const choices = data.properties.choices.map(choice => {
    return {
      type: 'postback',
      title: choice.label,
      payload: choice.label,
    }
  })
  response.attachment = {
    type: 'template',
    payload: {
      template_type: 'button',
      text: data.title,
      buttons: choices,
    },
  }
  return response
}

const translateDropDown = translateMultipleChoice

//yes_no to quick reply
const translateYesNo = (data) => {
  const response = translateShortText(data)
  response.quick_replies = [
    {
      content_type: 'text',
      title: 'yes',
      payload: 'yes',
    },
    {
      content_type: 'text',
      title: 'no',
      payload: 'no',
    },
  ]
  return response
}

const translateLegal = translateYesNo

//email to quick reply (fb has qr button for sending email assoc with account)
const translateEmail = (data) => {
  const response = translateShortText(data)
  response.quick_replies = [
    {
      content_type: 'user_email',
      title: 'send email',
    },
  ]
  return response
}

//opinion scale to quick reply
const translateOpinionScale = (data) => {
  const response = translateShortText(data)
  response.quick_replies = [
    {
      content_type: 'text',
      title: '1',
      payload: {choice: 1, base: 5},
    },
    {
      content_type: 'text',
      title: '2',
      payload: {choice: 2, base: 5 },
    },
    {
      content_type: 'text',
      title: '3',
      payload: {choice: 3, base: 5 },
    },
    {
      content_type: 'text',
      title: '4',
      payload: {choice: 4, base: 5 },
    },
    {
      content_type: 'text',
      title: '5',
      payload: {choice: 5, base: 5 },
    },
  ]
  return response
}

const translateRatings = (data) => {
  const response = translateShortText(data)
  let counter = 0
  response.quick_replies = Array(data.properties.steps).fill('*').map(space => {
    return {
      content_type: 'text',
      title: ++counter,
      payload: `${counter} out of ${data.properties.steps}`,
    }
  })
  return response
}

//transform to carousel of generic templates
const translatePictureChoice = (data) => {
  const response = {}
  const elements = data.properties.choices.map(choice => {
    const buttons = [
      {
        type: 'postback',
        title: `select ${choice.label}`,
        payload: choice.label,
      },
    ]
    return {
      title: data.title,
      image_url: choice.attachment.href,
      buttons,
    }
  })
  response.attachment = {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements,
    },
  }
  return response
}

module.exports = {
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
}
