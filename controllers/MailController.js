const nodemailer = require('nodemailer');
const table = require('cli-table2');

// konfigurasi nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'galihwicaksonomukti2001@gmail.com',
        pass: 'gkijulioeypldfyj'
    }
});

// definisikan fungsi untuk mengirim email
exports.kirimEmail = (req, res) => {

    const { dataEmail1, dataEmail2, dataEmail3, dataEmail4, dataEmail5} = req.body;
    // const data1 = dataEmail1.toString()
    const mailOptions = {
        from: 'monitoringsystem@noreply',
        to: 'galihwicaksonomukti2000@gmail.com',
        subject: 'WARNING! ERROR H2HMONITOR SYSTEM',
        html:`

		<!DOCTYPE html>

<html>
  <head>
    <style>
      td {
        color: white;
        text-align: center;
        font-weight: bold;
      }
    
        footer p {
        margin-top: 30px;
      }
       footer b{
        margin-top: 30px;
      }
      table{
        border: none;
        border-radius: 7px;
        border: 0;

      }
     
    </style>
  </head>
  <body>
 <nav>
  <div class="navbar-container">
    <div class="navbar-logo">
      <img src="https://1.bp.blogspot.com/-tR59_3q2Z2Y/YIJ62ioh6NI/AAAAAAAACkc/W5JTyrlwi7oQGKYb1XWDtZySUbBM_THiQCNcBGAsYHQ/s2048/Pertamina.png" width="40px" height"35px" alt="Logo Perusahaan">
    </div>
    
  </div>
</nav>
  <h3 align="center">Berikut ini merupakan data yang Error:</h3>
  <br>
    <table align="center">
       <tr>
    <th width="250px" style="background-color: #338FFF; color: white">Event Date</th>
    <th width="250px" style="background-color: #338FFF; color: white">Description</th>
    <th width="60px" style="background-color: #338FFF; color: white">Bank</th>
  </tr>
     ${dataEmail1}
     ${dataEmail2}
     ${dataEmail3}
     ${dataEmail4}
     ${dataEmail5}
    </table>
    <br>
    <footer align="center" >
      <b style="margin-top: 50px;">Untuk informasi lebih lanjut, silakan periksa Web Monitoring.</b>
      <p>Hak Cipta © 2023 PT.Pertamina. All rights reserved.</p>
    </footer>
  </body>
</html>
  `
    };

    // kirim email menggunakan transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Gagal mengirim email');
        } else {
            console.log('Email berhasil dikirim: ' + info.response);
            res.send('Email berhasil dikirim');
        }
    });
};

exports.kirimEmailTable = (req, res) => {
function createTable(sendDataArray) {
   let table = "";
    sendDataArray.forEach((item) => {
      table += `<tr><td style="background-color: red; color: white">${item.hostname}</td><td style="background-color: red; color: white">${item.nama_table}</td></tr>`;
    });
    return table;
}

    const { sendDataArray } = req.body;

    const mailOptions = {
        from: 'monitoringsystem@noreply',
        to: 'galihwicaksonomukti2000@gmail.com',
        subject: 'WARNING! ERROR TABLE ERP SYSTEM',
        html:`

		<!DOCTYPE html>

<html>
  <head>
    <style>
      td {
        color: black;
        text-align: center;
        font-weight: bold;
      }
    
        footer p {
        margin-top: 30px;
      }
       footer b{
        margin-top: 30px;
      }
     
    </style>
  </head>
  <body>
 <nav>
  <div class="navbar-container">
    <div class="navbar-logo">
      <img src="https://1.bp.blogspot.com/-tR59_3q2Z2Y/YIJ62ioh6NI/AAAAAAAACkc/W5JTyrlwi7oQGKYb1XWDtZySUbBM_THiQCNcBGAsYHQ/s2048/Pertamina.png" width="40px" height"35px" alt="Logo Perusahaan">
    </div>
    
  </div>
</nav>
  <h3 align="center">Berikut ini merupakan data yang Error:</h3>
  <br>
      <table align="center" style="border: none; border-radius: 7px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
       <tr>
    <th width="250px" style="background-color: #338FFF; color: white">Nama Hostname</th>
    <th width="250px" style="background-color: #338FFF; color: white">Nama Table</th>
  </tr>
     ${createTable(sendDataArray)}
    
    </table>
    <br>
    <footer align="center" >
      <b style="margin-top: 50px;">Untuk informasi lebih lanjut, silakan periksa Web Monitoring.</b>
      <p>Hak Cipta © 2023 PT.Pertamina. All rights reserved.</p>
    </footer>
  </body>
</html>
  `
    };

    // kirim email menggunakan transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Gagal mengirim email');
        } else {
            console.log('Email berhasil dikirim: ' + info.response);
            res.send('Email berhasil dikirim');
        }
    });
};
