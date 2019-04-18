import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'


const Container = styled.div`
`;


export default class Scatter extends React.Component {
  constructor (props) {
    super(props)

    // Feed the highchart chart options here
    this.options = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'The Greatest Scatter Chart Known to Mankind'
        },
        xAxis: {
            type: 'datetime',
            title: {
                enabled: true,
                text: 'X Axis Name'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            tickInterval: (24 * 3600 * 1000),
            labels: {
              formatter: function() {
                return Highcharts.dateFormat('%d-%b-%Y', (this.value));
              }
            }
        },
        yAxis: {
            title: {
                text: 'Y Axis Name'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                  headerFormat:'<b>{point.point.name}</b><br>'
                }
            }
        },
        series: [{
        
            data: null,
        }]
    }
  }

  // Render Function
  render() {

    // Assign options variable to the Sparkline object's options
    const options = { ...this.options }

    // Will likely be a for loop

    options.series[0].data = this.props.data
    options.series[0].name = "Some Series"
    options.series[0].color = this.props.config.color ? this.props.config.color[0] : null

    // BY THE END OF THIS CHAIN, WE SHOULD HAVE X NUMBER OF SERIES CORRESPONDING TO THE NUMBER OF PROBABILITY GROUPS

    // Use the width and height that the user gives, or use default
    options.chart.width = this.props.config.chart_width
    options.chart.height = this.props.config.chart_height

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
