function dateMaker() {
  return i3Object();
}

/**
 * Return an i3 bar json string
 */
function i3Object() {
  const date = new Date();

  const i3Object = {
    name: "time",
    full_text: date.toString().substring(0, date.toString().indexOf('G')-1),
  };

  return JSON.stringify(i3Object);
}

module.exports = dateMaker;