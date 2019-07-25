import AreaMotion from './components/AreaMotion'
import React from 'react'
import ReactDOM from 'react-dom'

looker.plugins.visualizations.add({
  options: {
  },

  // Looker runs this function first
  create: function(element, config) {
    element.innerHTML = `
      <style>
        .areaMotion {
          height: 100%;
        }
        .highcharts-container {
          margin: 0 auto;
        } 
        
      </style>
    `;

    let container = element.appendChild(document.createElement("div"));
    container.className = "areaMotion";

    this._Element = container.appendChild(document.createElement("div"));

    this.chart = ReactDOM.render(
      <AreaMotion
        done={false}
      />
     ,this._Element
    );

  },

  // When Looker receives data from the query, we run this guy
  // Changing viz config stuff forces a rerun on this guy
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    this.column = ReactDOM.render(

      // CAN FEED THESE INTO Scatter.js instead of InBetweenClass (with some refactoring) which means I have access to all the InBetweenClass stuff
      // in Scatter.js
      <AreaMotion
        // From InBetweenClass
        key="areaMotion"

        config={config}
        data={data}
        done={done}
        queryResponse={queryResponse}
      />,
      this._Element
    );


    done()
  }
});
