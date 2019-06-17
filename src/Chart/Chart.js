import {scaleTime, scaleLinear} from 'd3-scale';
import {chartCartesian} from '@d3fc/d3fc-chart';
import {extentLinear} from '@d3fc/d3fc-extent';
import {seriesCanvasCandlestick} from '@d3fc/d3fc-series';
import {rebindAll} from '@d3fc/d3fc-rebind';
import '@d3fc/d3fc-element';

import d3Component from './d3Component';

export default d3Component("chart", () => {
    const base = chartCartesian(scaleTime(), scaleLinear())
        .xLabel('Date')
        .yLabel('Price')
        .canvasPlotArea(seriesCanvasCandlestick());

    const chart = selection => {
        const data = selection.datum();
        const lastDate = data[data.length - 1].date;
        const firstDate = new Date(lastDate);
        firstDate.setMinutes(firstDate.getMinutes() - 1);

        base
            .xDomain([firstDate, lastDate])
            .yDomain(extentLinear().accessors([d => d.high, d => d.low])(data))

        try {
            base(selection);
        } catch(e) {
            console.error(e);
        }
    };

    rebindAll(chart, base);
    return chart;
});
