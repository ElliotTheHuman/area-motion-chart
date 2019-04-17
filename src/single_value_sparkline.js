import SomeClass from './components/SomeClass'
import React from 'react'
import ReactDOM from 'react-dom'

looker.plugins.visualizations.add({
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    },
    sparkline_color: {
      type: "array",
      label: "Sparkline Color",
      display: "color",
      default: "#5b5d9a"
    },
    chart_alignment: {
      type: "string",
      label: "Chart Alignment",
      display: "radio",
      values: [
        {"Top": "top"},
        {"Bottom": "bottom"},
        {"Left": "left"},
        {"Right": "right"},
      ],
      default: "top"
    },
    data_granularity: {
      type: "string",
      label: "Data Granularity",
      display: "radio",
      values: [
        {"1x": "1"},
        {"2x": "2"},
        {"5x": "5"},
        {"10x": "10"},
        {"100x": "100"}
      ],
      default: "1"
    },
   chart_width: {
      type: "string",
      label: "Sparkline Width",
      default: 100,
    },
    chart_height: {
      type: "string",
      label: "Sparkline Height",
      default: 100,
    },
    chart_type: {
      type: "string",
      label: "Chart Type",
      display: "radio",
      values: [
        {"Area": "area"},
        {"Column": "column"}
      ],
      default: "area"
    }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        .area-chart {
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
    container.className = "area-chart";

    this._textElement = container.appendChild(document.createElement("div"));

    this.chart = ReactDOM.render(
      <SomeClass
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

    this.chart = ReactDOM.render(
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
