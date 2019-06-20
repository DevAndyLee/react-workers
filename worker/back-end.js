export default class BackEnd {
    constructor(api) {
        this.api = api;
        this.socket = null;
        this.interval = null;
        this.buffer = [];

        this.api.on('start', () => this.start());
        this.api.on('stop', () => this.stop());
    }

    start() {
        this.stop();
        this.interval = setInterval(() => this.sendTick(), 1000);

        const scheme = location.protocol === "https:" ? "wss" : "ws";
        const port = scheme === "wss" ? ':4443' : (location.port ? (":" + location.port) : "");
        const url = `${scheme}://${location.hostname}${port}/api/random`;

        this.socket = new WebSocket(url);

        this.socket.addEventListener('message', event => {
            const data = JSON.parse(event.data);
            switch(data.type) {
                case 'data':
                    data.content.date = new Date(data.content.date);
                    this.buffer.push(data.content);
                    break;
                default:
                    console.log('unknown message', data);
                    break;
            }
        });
    }

    stop() {
        if (this.socket) {
            this.socket.close();
        }
        clearInterval(this.interval);
    }

    sendTick() {
        if (this.buffer.length) {
            this.api.post('data', this.buffer);
            this.buffer = [];
        }
    }
};
