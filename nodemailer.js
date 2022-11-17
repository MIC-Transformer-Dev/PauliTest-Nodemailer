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
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
          border-radius: 0.5rem;
          overflow: hidden;
          color: var(--black);
        }
        
        thead th {
          font-family: var(--font-heading);
          font-size: 1rem;
          text-transform: uppercase;
          font-weight: 700;
          text-align: left;
          padding: 0.75rem 1rem;
          background-color: var(--lightest-grey);
          color: var(--dark-grey);
        }
        
        tbody td {
          padding: 0.75rem 1rem;
          font-size: 1.125rem;
          font-family: var(--font-body);
        }
        
        .bold-border {
          border-bottom: 3px solid var(--light-grey);
        }
        
        .thin-border {
          border-bottom: 1px solid var(--lighter-grey);
        }
      </style>
      <p>Total Jawaban Benar: ${fetchData.data[0].totalCorrect}</p>
      <p>Total Jawaban Salah: ${fetchData.data[0].totalIncorrect}</p>
      <p>Rasio Jawaban Benar: ${fetchData.data[0].ratio}</p>
      <p>Standar Deviasi: ${fetchData.data[0].standardDeviation}</p>
      <p>Durasi: ${fetchData.data[0].duration}</p>
      <p>Jawaban Per Ronde: ${fetchData.data[0].answerPerRound}</p>
      <br>
      <p>Game History</p>
      <table>
        <thead>
          <th style="text-align:center">No.</th>
          <th style="text-align:center">Time</th>
          <th style="text-align:center">Question</th>
          <th style="text-align:center">Answer</th>
          <th style="text-align:center">Status</th>
          <th style="text-align:center">Round</th>
        </thead>
        <tbody>
          ${
            fetchData.data[0].gameHistory
              .map(({ durationMs, questionNumber: [a, b], answer, round }, idx, history) => `
                <tr class="${idx + 1 < history.length && history[idx + 1].round !== round ? 'bold-border' : 'thin-border'}">
                  <td style="text-align:center">${idx + 1}</td>
                  <td style="text-align:center">${durationMs}ms</td>
                  <td style="text-align:center">${a} + ${b}</td>
                  <td style="text-align:center">${answer}</td>
                  <td style="text-align:center">
                    ${((a + b) % 10 === answer) ? "Correct" : "Incorrect" }
                  </td>
                  <td style="text-align:center">${round}</td>
                </tr>
              `).join("")
          }
        </tbody>
      </table>
      `,
    })
    console.log('mail is sent')
  } 
  catch(err) {
    console.log(err)
  }
}

fetchAndMail()



