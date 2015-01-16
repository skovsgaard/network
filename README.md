Network
===

Structure
---

All external requests hit the Ruby load balancer running on port 7000.

The load is distributed between 3 node servers, each corresponding to a node endpoint, which reads the JSON data and responds with the requested data. In addition to brokering the connection between the public server and the internal resource, these three node servers also do load balancing, distributing the load between the two mirrors of the internal endpoint.

The request data is a plain GET-request as no sensitive or non-public information is exchanged, and the response body is a JSON-string representing the currency data requested, e.g. `{"DKK": {"monthly": 1234.56}}".

Usage
---

`git clone https://github.com/skovsgaard/network.git -b prod`

`cd network`

`chmod +x startup && ./startup`

This will start all nodes in the system, making it outwards accessible on port 7000.

*Note*: This will work on Linux, Mac, and other Unices only.


The project is also available at https://github.com/skovsgaard/network
