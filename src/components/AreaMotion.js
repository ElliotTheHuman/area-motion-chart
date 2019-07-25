import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'
import motion from './motion'

const Container = styled.div`
`;


export default class AreaMotion extends React.Component {
  constructor (props) {
    super(props)

    this.options = {
        chart: {
            type: 'area',
            height: (9 / 16 * 60) + '%' // 16:9 ratio
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
        	title: {
        		text: ''
        	},
            min: 0,
            max: 9999
        },
        motion: {
            enabled: true,
            // labels: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
            series: [], // The series which holds points to update; starts as empty, but adds another element per series
            updateInterval: 20,
            magnet: {
                type: 'both', // thumb / point / both
                round: 'floor', // ceil / floor / round
                smoothThumb: true, // defaults to true
                step: 0.05
            }
        },
        series: [
            // {
            //     data: [
                     
            //             { 
            //                 sequence: [[1,1],[2,2],etc.]
            //             }
                    
            //     ]
            // }
        ]
    }
}

  // Render Function
  render() {

    const options = { ...this.options } // current viz options

    let labelsToRender = [] // will take the place of motion.labels
    let seriesToRender = []
    let lookerData = this.props.data // Data from Looker
    let numberOfRows = this.props.data.length
    let dimensionName = this.props.queryResponse.fields.dimensions[0].name // name of the first dimension
    let measureArray = this.props.queryResponse.fields.measures
    

    /////////////// Y-AXIS CONFIGURATION (really just hunting for the max) ///////////////

    let max = 0;

    for(let i = 0; i < measureArray.length; i++) {
        for(let j = 0; j < numberOfRows; j++) {

            let currentValue = lookerData[j][measureArray[i].name].value

            if(currentValue > max) max = currentValue
        }
    }

    options.yAxis.max = max;
    console.log(max)

    /////////////// LABEL AND X-AXIS CONFIGURATION ///////////////
    for(let i = numberOfRows - 1; i >= 0; i--) {
        labelsToRender.push(lookerData[i][dimensionName].value)
    }

    options.motion.labels = labelsToRender
    options.xAxis.categories = labelsToRender




    /////////////// SEQUENCE CREATION ///////////////
    for(let a = 0; a < measureArray.length; a++) {

    	let dataToRender = [] // will take the place of series.data.sequence
        let measureName = measureArray[a].name // name of the first measure

        // Create a new entry in series
        seriesToRender.push( 
        	{ 
        		name: measureName,
        		data: []
        	} 
        )

        for(let i = 0; i < numberOfRows; i++) { // Create X number of sequences, where X is the number of rows/xAxis labels
            dataToRender.push(
                {
                    sequence: []
                }
            )
        }

        for(let i = numberOfRows - 1; i >= 0; i--) {
            
            // We want to pump this guy in X times where X is equal to the number of rows
            let sequenceToRender = [];

            let tempElement =
            {
                y: lookerData[i][measureName].value,
            };

            // Fill each sequence with the appropraite temp element
            for(let j = 0; j < numberOfRows; j++) {

                // If j < (numberOfRows - 1) - i, then instead put in a dummy
                if(j < (numberOfRows - 1) - i)
                    sequenceToRender.push(
                        {
                            y: null    
                        }
                    )
                else
                    sequenceToRender.push(tempElement)
            }

            dataToRender[numberOfRows - i - 1].sequence = sequenceToRender
        }

        seriesToRender[a].data = dataToRender

        // Last minute touches
        options.motion.series.push(a) // add new series ID to motion.series

    }

    options.series = seriesToRender

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
