function dateMaker() {
  const date = new Date();

  return date.toString().substring(0, date.toString().indexOf('G')-1);
}

module.exports = dateMaker;