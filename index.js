// Here the web service should be setup and routes declared
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const emailSubscribersService = require('./services/emailSubscribersService');

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//ARTS
app.get('/api/emailSubscribers', (req, res) => {
  emailSubscribersService.getAllAvailableEmails(
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});

app.get('/api/allEmailSubscribers', (req, res) => {
  emailSubscribersService.getAllEmails(
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});

app.post('/api/emailSubscriber', (req, res) => {
  emailSubscribersService.createSubscriber(
    req.body,
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});
app.post('/api/emailSubscriber/:id', (req, res) => {
  emailSubscribersService.deactivateEmail(
    req.params.id,
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});
