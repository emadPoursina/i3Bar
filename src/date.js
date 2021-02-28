const date = new Date();

function dateMaker() {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

module.exports = dateMaker;