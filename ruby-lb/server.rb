require "net/http"
require "socket"

server = TCPServer.new('skovsgaard.me', 7000)
tick = 1
redirects = []

puts "Running the Ruby load balancer on port 7000"

def divisible_by(tick)
  if tick % 3 == 0
    3
  elsif tick % 2 == 0
    2
  else
    1
  end
end

def balance_req(tick, args)
  tick_order = divisible_by tick
  args[1] = args[1].upcase

  Net::HTTP.get URI "http://localhost:300#{tick_order}?#{args[0]}=#{args[1]}"
end

def most_redirected(redirects)
  puts "So far the most hit number is"
  puts redirects.inject{|sum,x| sum + x} / redirects.length
end

loop do
  socket = server.accept
  req = socket.gets
  params = req.chomp.split(" ")[1][2..-1]

  if params and params.include? "="
    key = params.split("=")[0]
    val = params.split("=")[1]

    puts req

    res = balance_req tick, [key, val]
  else
    puts req
    res = balance_req tick, ["currency", "USD"]
  end

  tick += 1

  redirects.push divisible_by tick

  socket.puts ["HTTP/1.1 200 OK",
               "Content-Type: application/json",
               "Content-Length: #{res.length}",
               "Connection: close"].join("\r\n")

  socket.print "\r\n"
  socket.puts res
  socket.puts "dong"
  puts "response is #{res}" 

  puts "Current number is #{divisible_by tick}."
  most_redirected redirects

  socket.close
end
