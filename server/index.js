const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const { timeInterval } = require('d3-time');
const { randomFinancial } = require('@d3fc/d3fc-random-data');
 
const server = http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  });
const wss = new WebSocket.Server({ noServer: true });

const interval100Milliseconds = timeInterval(
    date => {
        date.setMilliseconds(Math.round(date.getMilliseconds() / 100) * 100);
    },
    (date, step) => {
        date.setMilliseconds(date.getMilliseconds() + 10 * step)
    }
);

wss.on('connection', function connection(ws) {
    console.log('client connected');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.on('close', function close() {
        console.log('client disconnected');
        clearTimeout(timeout);
    });

    const generator = randomFinancial()
        .startDate(new Date())
        .startPrice(100)
        .interval(interval100Milliseconds);
    const stream = generator.stream();

    const dataTick = () => {
        const data = stream.next();
        ws.send(JSON.stringify({ type: 'data', content: data }));

        timeout = setTimeout(dataTick, Math.random() * 100);
    };
    let timeout = setTimeout(dataTick, 100);
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    
    if (pathname === '/api/random') {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});
    
server.listen(4000);
console.log('listening on port 4000');
