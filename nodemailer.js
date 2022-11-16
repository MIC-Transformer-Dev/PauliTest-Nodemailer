const nodemailer= require('nodemailer');
const axios = require('axios')

const fetchAndMail = async () => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mictransformer.dev@gmail.com',
      pass: 'ylmgjjwcnvdxhvmo'
    }
  });
  try {
    const fetchData = await axios.get('http://localhost:4000/test/latest')
    transporter.sendMail({
      to:"anthonygunardi@gmail.com",
      from:"mictransformer.dev@gmail.com",
      subject:"Nodemailer Test",
      html:`
      <p>Total Jawaban Benar: ${fetchData.data[0].totalCorrect}</p>
      <p>Total Jawaban Salah: ${fetchData.data[0].totalIncorrect}</p>
      `,
    })
    console.log('mail is sent')
  } 
  catch(err) {
    console.log(err)
  }
}

fetchAndMail()



