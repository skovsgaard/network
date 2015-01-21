request = require 'request'
http = require 'http'
url = require 'url'
fs = require 'fs'
inFile = fs.createWriteStream 'snapshot.json'

extractByCurrency = (jsonDoc, currency) ->
  doc = JSON.parse jsonDoc
  doc[currency]

fetchData = ->
  request
  .get 'https://api.bitcoinaverage.com/all'
  .pipe inFile
  .on 'close', ->
    console.log 'JSON snapshot saved.'
  .on 'error', (reason) ->
    console.log "#{reason}"

serverLogic = (req, res) ->
  fs.exists 'snapshot.json', (exists) ->
    if exists
      res.writeHead 200, 'Content-Type': 'application/json'
      fs.createReadStream 'snapshot.json'
      .pipe res
      .on 'close', ->
        res.end()
    else
      res.end new Error 'The resource could not be located.'

snippetLogic = (req, res) ->
  currency = url.parse(req.url).path
  fs.readFile 'snapshot.json', (err, data) ->
    unless err
      dataObj = JSON.parse data.toString()
      res.end JSON.stringify dataObj[currency.slice 1, currency.length ]

fetchData()
#getterInterval = setInterval fetchData, 1000*60
#console.log "Getter on first tick, interval set to #{1000*60} seconds"

server = http.createServer serverLogic
server.listen 9999
#console.log 'Document fetcher listening on port 9999.'

#snippetServer = http.createServer snippetLogic
#snippetServer.listen 8888

process.on 'exit', (code) ->
  console.log "The application closed with code, #{code}."
  clearInterval getterInterval
  server.close()
