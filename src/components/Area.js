import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'


const Container = styled.div`
`;


export default class Area extends React.Component {
  constructor (props) {
    super(props)

    // Feed the highchart chart options here
    this.options = {
      chart: {
        align: 'center',
        backgroundColor: null,
        borderWidth: 0,
        type: 'area',
        margin: [2, 0, 2, 0],
        width: 100,
        height: 100,
        style: {
          overflow: 'visible',
        },
        skipClone: true
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickPositions: []
      },
      yAxis: {
        endOnTick: false,
        startOnTick: false,
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        tickPositions: [0]
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        series: {
          animation: false,
          lineWidth: 1,
          shadow: false,
          states: {
            hover: {
              enabled: false
            }
          },
          marker: {
            radius: 1,
            states: {
              hover: {
                radius: 2
              }
            }
          },
          fillOpacity: 0.25
        },
        column: {
          negativeColor: '#910000',
          borderColor: 'silver'
        }
      },
      series: [{

        // Data is just an array that you can assign values in the render function
        data: null,
      }],
       loading: false
      }
  }

  // Render Function
  render() {

    // Assign options variable to the Sparkline object's options
    const options = { ...this.options }

    options.series[0].data = this.props.data

    // assign the color to be the user inputted color; otherwise do nothing and use the default
    options.plotOptions.series.color = this.props.config.color ? this.props.config.color[0] : null

    // Use the width and height that the user gives, or use default
    options.chart.width = this.props.config.chart_width
    options.chart.height = this.props.config.chart_height

    // Elliot Note: Let's try giving the user an option to choose either "column" or "area"
    options.chart.type = this.props.config.chart_type

    return (
      <Container>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Container>
    )
  }
}
