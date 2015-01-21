request = require \request
http = require \http
url = require \url
fs = require \fs

get-currency = (req, res) ->
  currency = req.url |> url.parse

  return res.end '{"error": "no route"}' if currency.pathname.length <= 1

  currency = currency.pathname.slice 1 currency.length

  fs.read-file \buffered.json (err, data) ->
    unless err
      parsed = data |> JSON.parse
      unless parsed[currency] is undefined
        parsed[currency].averages
        |> JSON.stringify
        |> res.end
      else
        res.end '{"error": "currency not found"}'

request \http://localhost:9999
.pipe fs.create-write-stream \buffered.json
.on \close ->
  http.create-server get-currency .listen \7777
  console.log 'Listening on port 7777.'
