const provision = require('./app');

const PORT = process.env.PORT || 4000;

const app = provision();

app.listen(PORT)