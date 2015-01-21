request = require \request
http = require \http
url = require \url
fs = require \fs

get-currency = (req, res) ->
  currency = req.url |> url.parse
  currency = currency.pathname.slice 1 currency.length

  fs.read-file \buffered.json (err, data) ->
    unless err
      parsed = data |> JSON.parse
      parsed[currency].averages
      |> JSON.stringify
      |> res.end

request \http://localhost:9999
.pipe fs.create-write-stream \buffered.json
.on \close ->
  http.create-server get-currency .listen \7777
  console.log 'Listening on port 7777.'
