module.exports = function (args, text) {
  var vscode = require('vscode')
  var textEditor = vscode.window.activeTextEditor
  if (textEditor) {
    // args.log(JSON.stringify(textEditor.selection))
    textEditor.edit((editBuilder) => {
      editBuilder.replace(
        textEditor.selection,
        text
      )
      args.log('Done')
    })
  } else {
    vscode.window.showWarningMessage('No vscode.window.activeTextEditor')
  }
}