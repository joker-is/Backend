// Here the web service should be setup and routes declared
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const emailSubscribersService = require('./services/emailSubscribersService');

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

cors({ credentials: true, origin: true });
app.use(cors());

app.get('/api/emailSubscribers', cors(), (req, res) => {
  emailSubscribersService.getAllAvailableEmails(
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});

app.get('/api/allEmailSubscribers', cors(), (req, res) => {
  emailSubscribersService.getAllEmails(
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});

app.post('/api/emailSubscriber', cors(), (req, res) => {
  emailSubscribersService.createSubscriber(
    req.body,
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});
app.post('/api/emailSubscriber/:id', cors(), (req, res) => {
  emailSubscribersService.deactivateEmail(
    req.params.id,
    resources => res.json(resources),
    err => res.status(err.message).send()
  );
});
