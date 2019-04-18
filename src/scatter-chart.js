import InBetweenClass from './components/InBetweenClass'
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
    chart_height: {
      type: "string",
      label: "Chart Height",
      default: 500,
    },
   chart_width: {
      type: "string",
      label: "Chart Width",
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
    if (queryResponse.fields.dimensions.length < 3) {
      this.addError({title: "Not Enough Minerals (In a StarCraft Voice)", message: "You must construct additional dimensions (again, in a StarCraft voice)."});
      return;
    }

    this.InBetweenClass = ReactDOM.render(
      <InBetweenClass
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
