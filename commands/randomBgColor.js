exports.execute = function (args) {
  var insertHere = require('./insertHere')
  var range = (fromVal, toVal) => Math.floor(fromVal + (Math.random() * (toVal - fromVal)))
  insertHere(args, `style={{ background: \`hsl(${range(0, 360)}, ${range(30, 60)}%, ${range(30, 60)}%)\` }}`)
}
