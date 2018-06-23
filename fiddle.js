const questions = new Map()
const fields = new Map()

fields.set('q1', {content: 'who are you?'})
fields.set('q2', {content: 'why are you here?'})

questions.set('id', 'asb123')
questions.set('fields', fields)
questions.set('goodbye', 'nice to have you here!')

for ([key, value] of questions.get('fields')) {
  console.log('log: ',key, value)
}

