class Helper {
  simple(fullText, name) {
    return `{
      "name": "${name}", 
      "full_text": "${fullText}"
    }`;
  }
}

module.exports = new Helper();