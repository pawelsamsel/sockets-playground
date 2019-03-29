const ExampleService = require('services/ExampleService');

module.exports = (req, res) => {
  const result = new ExampleService().getExample();
  res.send(result);
};
