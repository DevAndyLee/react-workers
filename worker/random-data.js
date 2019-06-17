import { timeInterval } from 'd3-time';
import { randomFinancial } from '@d3fc/d3fc-random-data';

const interval100Milliseconds = timeInterval(
    date => {
        date.setMilliseconds(Math.round(date.getMilliseconds() / 100) * 100);
    },
    (date, step) => {
        date.setMilliseconds(date.getMilliseconds() + 10 * step)
    }
);

export default class RandomData {
    constructor(api) {
        this.api = api;
        this.interval = null;
        this.timeout = null;
        this.buffer = [];
        
        const generator = randomFinancial()
            .startDate(new Date())
            .startPrice(100)
            .interval(interval100Milliseconds);
        this.stream = generator.stream();

        this.api.on('start', () => this.start());
        this.api.on('stop', () => this.stop());

        this.timeout = setTimeout(() => this.dataTick(), 100);
    }

    start() {
        this.stop();
        this.interval = setInterval(() => this.sendTick(), 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    sendTick() {
        this.api.post('data', this.buffer);
        this.buffer = [];
    }

    dataTick() {
        this.buffer.push(this.stream.next());
        this.timeout = setTimeout(
            () => this.dataTick(),
            Math.random() * 100
        );
    }
};
