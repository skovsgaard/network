require "net/http"
require "socket"

server = TCPServer.new('localhost', 7000)
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

def balance_req(tick)
  tick_order = divisible_by tick

  Net::HTTP.get URI "http://localhost:300#{tick_order}"
end

def most_redirected(redirects)
  puts "So far the most hit number is"
  puts redirects.inject{|sum,x| sum + x} / redirects.length
end

loop do
  socket = server.accept
  req = socket.gets
  puts req

  res = balance_req tick 
  tick += 1

  redirects.push divisible_by tick

  socket.print  "HTTP/1.1 200 OK\r\n" +
                "Content-Type: text/plain\r\n" +
                "Content-Length: #{res.bytesize}\r\n" +
                "Connection: close\r\n"

  socket.print "\r\n"
  socket.print res

  puts "Current number is #{divisible_by tick}."
  most_redirected redirects

  socket.close
end
