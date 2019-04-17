import SomeClass from './components/InBetweenClass'
import React from 'react'
import ReactDOM from 'react-dom'

looker.plugins.visualizations.add({
  options: {
    color: {
      type: "array",
      label: "Color",
      display: "color",
      default: "#5b5d9a"
    },
   chart_width: {
      type: "string",
      label: "Chart Width",
      default: 500,
    },
    chart_height: {
      type: "string",
      label: "Chart Height",
      default: 1000,
    }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        .scatter-chart {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .highcharts-container {
          margin: 0 auto;
        } 
        
      </style>
    `;

    let container = element.appendChild(document.createElement("div"));
    container.className = "scatter-chart";

    this._textElement = container.appendChild(document.createElement("div"));

    this.chart = ReactDOM.render(
      <InBetweenClass
        done={false}
      />,
      this._textElement
    );

  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    this.InBetweenClass = ReactDOM.render(
      <SomeClass
        config={config}
        data={data}
        done={done}
        queryResponse={queryResponse}
      />,
      this._textElement
    );

    done()
  }
});
