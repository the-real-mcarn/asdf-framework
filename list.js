var serveIndex = require('serve-index')

require('budo').cli(process.argv.slice(2), {
  middleware: serveIndex(__dirname)
})