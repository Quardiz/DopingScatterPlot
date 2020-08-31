import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ScatterPlot from './components/scatter-plot/scatter-plot'

ReactDOM.render(
  <React.StrictMode>
    <div id="holder">
      <h1>Doping in Professional Bicycle Racing</h1>
      <div id="vertical-div">
        <h2 id="vertical-text">Time in Minutes</h2>
        <ScatterPlot />
      </div>
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
