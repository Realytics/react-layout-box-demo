exports.execute = function (args) {
  var insertHere = require('./insertHere')
  var range = (fromVal, toVal) => Math.floor(fromVal + (Math.random() * (toVal - fromVal)))
  insertHere(args, `style={{ background: \`hsl(${range(0, 360)}, 25%, 50%)\` }}`)
}
