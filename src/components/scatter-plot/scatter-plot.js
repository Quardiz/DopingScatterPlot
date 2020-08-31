import React, {Component} from 'react';
import * as d3 from "d3";
import {BottomAxis} from '../axis/bottom-axis'
import {LeftAxis} from '../axis/left-axis'
import './scatter-plot.css' 
import Tooltip from '../tooltip/tooltip'

export default class ScatterPlot extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            toolBarData: null
          };
        this.onMouseOver = this.onMouseOver.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
            .then(response => response.json())
            .then(json => this.setState({ data: json, isLoading: false }));
    }

    convert(minutes){
        let numbers = minutes.split(":");
        return Math.round(100*(parseFloat(numbers[0]) + (parseFloat(numbers[1]) / 60)))/100;
    }

    onMouseOver(datum){
        this.setState(() => ({
            toolBarData: datum
        }));
    }

    render () {
        const { data, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        if(data == null){
            return <h1>No data available yet</h1>
        }
        else {
            const padding = 50;
            const radius = 7;
            const w = 800;
            const h = 500;
            const minTime = d3.min(data, (d) => this.convert(d.Time));
            const minYear = d3.min(data, (d) => d.Year);

            const xScale = d3.scaleLinear()
                    .domain([minYear-2, d3.max(data, (d) => d.Year)])
                    .range([padding, w - padding]);

            const yDataScale = d3.scaleLinear()
                    .domain([minTime, d3.max(data, (d) => this.convert(d.Time))])
                    .range([h - padding, 0]);

            const yAxisScale = d3.scaleLinear()
                    .domain([minTime, d3.max(data, (d) => this.convert(d.Time))])
                    .range([0, h - padding]);

            return <div id="svg-holder"><svg width={w+padding} height={h+padding}>
                <g transform={`translate(0, ${0})`}>
                    {data.map(
                        (d, i) => {
                            return <circle
                                key={i}
                                cx={xScale(d.Year)}
                                cy={h - yDataScale(this.convert(d.Time))}
                                r={radius}
                                className="plotted-circle"
                                fill={d.Doping == "" ? "orange" : "lightblue"}
                                stroke="black"
                                strokeWidth="1"
                                onMouseOver={() => this.onMouseOver(d)}
                                >
                            </circle>;
                        }
                    )}
                    <g transform={`translate(0, ${h})`}>
                        <BottomAxis
                            domain={xScale.domain()}
                            range={xScale.range()}
                        />
                    </g>
                    <g transform={`translate(${padding}, ${padding})`}>
                        <LeftAxis
                            domain={yAxisScale.domain()}
                            range={yAxisScale.range()}
                        />
                    </g>
                </g>
            </svg>
            { this.state.toolBarData != null ?
                <Tooltip
                    hoveredBar={this.state.toolBarData}
                    scales={{xScale: xScale, yScale: yAxisScale}}
                /> :
                null
            }
        </div>;

            }
        }
}