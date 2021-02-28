const date = new Date();

function dateMaker() {
  return date.toString().substring(0, date.toString().indexOf('G')-1);
}

module.exports = dateMaker;