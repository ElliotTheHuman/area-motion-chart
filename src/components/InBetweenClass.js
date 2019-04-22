import React from 'react'
import styled from 'styled-components'
import Highcharts from 'highcharts'

import Scatter from './Scatter'

const TopBottomLayout = styled.div``

const LeftRightLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

// Takes the Single Value AND the Sparkline object you created, then plops out a layout object
export default class Hello extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {

    // Take a JSON blob from the query results, then convert it into a JSON blob High charts can display
    let dataToRender = []
    
    for (let x = 9; x >= 0; x--) {
      let temp_json_blob = {}
      let number_of_dimensions = this.props.queryResponse.fields.dimensions.length

      for(let i = 0; i < number_of_dimensions; i++) {

        // X Axis: Close Date Dimension
        if(i == 0) {

          let dateAsArray = d[this.props.queryResponse.fields.dimensions[i].name].value.split("-") // splits a date string into a three-piece array
          let year = parseInt(dateAsArray[0])
          let month = parseInt(dateAsArray[1])
          let day = parseInt(dateAsArray[2])

          temp_json_blob.x = (Date.UTC(year,month,day))
        }
        // Y Axis: Days Open Dimension
        else if(i == 1) {
          temp_json_blob.y = d[this.props.queryResponse.fields.dimensions[i].name].value
        }
        // Tooltip Header: Opportunity Name
        else if(i == 2) {
          temp_json_blob.name = d[this.props.queryResponse.fields.dimensions[i].name].value
        }
        // Marker Color: Probability
        else if(i == 3) {
          let probability = d[this.props.queryResponse.fields.dimensions[i].name].value

            // Color Assignment
            if (probability > 50) {
              temp_json_blob.color = "#0000FF"
            } 
            else {
              temp_json_blob.color = "#FF0000"
            }
        }
        // Marker Radius: Deal Size
        else if(i == 4) {
          // Some jank scaling, might want to use log to get the right proportions?
          temp_json_blob.markder.radius = d[this.props.queryResponse.fields.dimensions[i].name].value/100000*5
        }
      }

      console.log(temp_json_blob)

      // temp_json_blob should be ready to go for Highcharts now
      dataToRender.push(temp_json_blob)
    }

    // So we create a Sparkline component with these specifications
    const scatter_chart = (
      <Scatter
        key="scatter_chart"
        color={this.props.config.color}
        config={this.props.config}
        data={dataToRender}
      />
    )

    let layout = [scatter_chart]


      // HOW DOES THE SMASHING TOGETHER WORK??

    let Container = TopBottomLayout
    switch (this.props.config.chart_alignment) {
      case 'bottom':
        layout.reverse()
        break
      case 'left':
        Container = LeftRightLayout
        break
      case 'right':
        layout.reverse()
        Container = LeftRightLayout
        break
    }

    return (
      <Container>
        {layout}
      </Container>
    )
  }
}
