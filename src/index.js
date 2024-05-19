const express = require('express');

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mailSender = require('./config/email-config')

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server successfully started on port : ${ServerConfig.PORT}`);

  try {
    const res  = await mailSender.sendMail({
      from: ServerConfig.GMAIL_EMAIL,
      to: 'abhiep09@gmail.com',
      subject: 'Is noti service working?',
      text: "Yes it is working"
    })
    console.log(res);
  } catch (error) {  
    
  }
});

 