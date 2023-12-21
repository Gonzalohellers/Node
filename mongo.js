

const Note = new Note({
  content: 'The dima´s mother is Easy',
  date: new Date(),
  important: true,
})
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})