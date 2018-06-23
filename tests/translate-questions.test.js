const mocha = require('mocha')
const chai = require('chai').should()
const mocks = require('./mocks/typeform-form')

const translateFunctions = require('../app/functions')

const {
  translateWelcomeScreen,
  translateShortText,
  translateLongText,
  translateStatement,
  translateMultipleChoice,
  translateYesNo,
  translateEmail,
  translateOpinionScale,
  translateRatings,
} = translateFunctions

describe('should translate the welcome screen', () => {
  const data = mocks.welcome_screens[0]
  const translated = translateWelcomeScreen(data)
  it('should be an object', () => {
    translated.should.be.an('object')
  })
  it('should have a text property with the title of the welcome screen', () => {
    translated.should.have.property('text', data.title)
  })
  it('should have a quick_replies property of type array', () => {
    translated.quick_replies.should.be.an('array')
  })
  it('quick_replies should have at least one element in it', () => {
    translated.quick_replies.should.not.be.empty
  })
  it('quick_replies should contain objects with properties of content_type, title and payload', () => {
    translated.quick_replies.forEach(reply => {
      reply.should.have.property('content_type', 'text')
      reply.should.have.property('title')
      reply.should.have.property('payload', data.properties.button_text)
    })
  })
})

describe('should translate short text questions', () => {
  const shortTextQuestion = mocks.fields.filter(question => {
    return question.type === 'short_text'
  })[0]

  const question = translateShortText(shortTextQuestion)
  it('should be an object', () => {
    question.should.be.an('object')
  })
  it('should have a text property that is the Typeform question', () => {
    question.should.have.property('text', shortTextQuestion.title)
  })
})

describe('should translate statement', () => {
  const statement = mocks.fields.filter(question => {
    return question.type === 'statement'
  })[0]

  const translated = translateStatement(statement)
  it('should be an object', () => {
    translated.should.be.an('object')
  })
  it('should have a text property with the title of the statement', () => {
    translated.should.have.property('text', statement.title)
  })
  it('should have a quick_replies property of type array', () => {
    translated.quick_replies.should.be.an('array')
  })
  it('quick_replies should have at least one element in it', () => {
    translated.quick_replies.should.not.be.empty
  })
  it('quick_replies should contain objects with properties of content_type, title and payload', () => {
    translated.quick_replies.forEach(reply => {
      reply.should.have.property('content_type', 'text')
      reply.should.have.property('title')
      reply.should.have.property('payload', statement.properties.button_text)
    })
  })
})

describe('should translate long_text questions', () => {
  const longTextQuestion = mocks.fields.filter(question => {
    return question.type === 'long_text'
  })[0]

  const question = translateLongText(longTextQuestion)
  it('should be an object', () => {
    question.should.be.an('object')
  })
  it('should have a text property that is the Typeform question', () => {
    question.should.have.property('text', longTextQuestion.title)
  })
})

describe('should translate yes/no questions', () => {
  const yesNoQuestion = mocks.fields.filter(question => {
    return question.type === 'yes_no'
  })[0]

  const translated = translateYesNo(yesNoQuestion)

  it ('should be an object', () => {
    translated.should.be.an('object')
  })
  it ('should have a text property with the title of the questions', () => {
    translated.should.have.property('text', yesNoQuestion.title)
  })
  it ('should have a quick_replies property of type array', () => {
    translated.quick_replies.should.be.an('array')
  })
  it ('quick_replies should have exactly two elements in it', () => {
    translated.quick_replies.should.have.length(2)
  })
  it('quick_replies should contain objects with properties of content_type, title and payload', () => {
    translated.quick_replies.forEach(reply => {
      reply.should.have.property('content_type', 'text')
      reply.should.have.property('title')
      reply.should.have.property('payload')
    })
  })
  it ('quick_replies[0].title should be "yes"', () => {
    translated.quick_replies[0].title.should.equal('yes')
  })
  it('quick_replies[0].payload should be "yes"', () => {
    translated.quick_replies[0].payload.should.equal('yes')
  })  
  it('quick_replies[1].title should be "no"', () => {
    translated.quick_replies[1].title.should.equal('no')
  })
  it('quick_replies[1].payload should be "no"', () => {
    translated.quick_replies[1].payload.should.equal('no')
  })
})

describe('should translate multiple choice questions', () => {

  const multipleChoiceQuestion = mocks.fields.filter(question => {
    return question.type === 'multiple_choice'
  })[0]

  const question = translateMultipleChoice(multipleChoiceQuestion)

  it('should be an object', () => {
    question.should.be.an('object')
  })
  it('should not have a text property', () => {
    question.should.not.have.property('text')
  })
  it('should have an attachment property', () => {
    question.should.have.property('attachment')
  })
  it('should have an attachment property of "type" : template', () => {
    question.attachment.should.have.property('type', 'template')
  })
  it('should have an attachment property "payload"', () => {
    question.attachment.should.have.property('payload')
  })
  it('should have a payload with property of "template_type" : button', () => {
    question.attachment.payload.should.have.property('template_type', 'button')
  })
  it('should have a payload with property of "text" as the question title', () => {
    question.attachment.payload.should.have.property('text', multipleChoiceQuestion.title)
  })
  it('should have a payload with property of buttons that is an array', () => {
    question.attachment.payload.buttons.should.be.an('array')
  })
  it('should have buttons with type, title and payload ', () => {
    question.attachment.payload.buttons.forEach(button => {
      button.should.have.property('type', 'postback')
      button.should.have.property('title')
      button.should.have.property('payload')
    })
  })

})

describe('should translate questions asking for email', () => {
  const emailQuestion = mocks.fields.filter(question => {
    return question.type === 'email'
  })[0]

  const translated = translateEmail(emailQuestion)

  it('should be an object', () => {
    translated.should.be.an('object')
  })
  it('should have a text property with the title of the questions', () => {
    translated.should.have.property('text', emailQuestion.title)
  })
  it('should have a quick_replies property of type array', () => {
    translated.quick_replies.should.be.an('array')
  })
  it('quick_replies should have one element in it', () => {
    translated.quick_replies.should.have.length(1)
  })
  it('quick_reply should be an object with property "content_type" of "user_email"', () => {
    translated.quick_replies[0].should.have.property('content_type', 'user_email')
  })
  it('quick_reply should be an object with property "title"', () => {
    translated.quick_replies[0].should.have.property('title', 'send email')
  })
  it('quick_reply should not have property "payload"', () => {
    translated.quick_replies[0].should.not.have.property('payload')
  })
})

describe('should translate questions that use an opinion scale', () => {
  const opinionScaleQuestions = mocks.fields.filter(question => {
    return question.type === 'opinion_scale'
  })[0]

  const translated = translateOpinionScale(opinionScaleQuestions)

  it('should be an object', () => {
    translated.should.be.an('object')
  })
  it('should have a text property with the title of the questions', () => {
    translated.should.have.property('text', opinionScaleQuestions.title)
  })
  it('should have a quick_replies property of type array', () => {
    translated.quick_replies.should.be.an('array')
  })
  it('quick_replies should have 5 elements in it', () => {
    translated.quick_replies.should.have.length(5)
  })
  it('quick_replies should have "content-type", "title", "payload" properties', () => {
    translated.quick_replies.every(reply => {
      if (reply.content_type && reply.title && reply.payload) {
        return true
      }
    }).should.equal(true)
  })
})

describe('should translate questions that ask for a rating', () => {
  const ratingQuestion = mocks.fields.filter(question => {
    return question.type === 'rating'
  })[0]

  const translated = translateRatings(ratingQuestion)

  it('should be an object', () => {
    translated.should.be.an('object')
  })
  it('should have a text property with the title of the questions', () => {
    translated.should.have.property('text', ratingQuestion.title)
  })
  it('should have a quick_replies property of type array', () => {
    translated.quick_replies.should.be.an('array')
  })
  it('quick_replies should have n elements as specified in question', () => {
    translated.quick_replies.should.have.length(ratingQuestion.properties.steps)
  })
  it('quick_replies should have "content-type", "title", "payload" properties', () => {
    translated.quick_replies.every(reply => {
      if (reply.content_type && reply.title && reply.payload) {
        return true
      }
    }).should.equal(true)
  })
  it('quick_replies title and payload should increment by one', () => {
    let counter = translated.quick_replies[0].title
    for (let [index, reply] of translated.quick_replies.entries()) {
      const payloadArr = reply.payload.split(' ')
      reply.title.should.equal(counter)
      Number(payloadArr[0]).should.equal(counter)
      Number(payloadArr[payloadArr.length-1]).should.equal(ratingQuestion.properties.steps)
      counter ++
    }
  })
})