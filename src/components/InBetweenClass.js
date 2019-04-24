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
    let data_array = this.props.data
    let number_of_rows = this.props.data.length
    let number_of_dimensions = this.props.queryResponse.fields.dimensions.length
    let scaling_factor = 1/10000
    
    // For each row in my data
    for (let x = (number_of_rows - 1); x >= 0; x--) {

      let temp_json_blob = {}

      // For each dimension/column in my data
      for(let i = 0; i < number_of_dimensions; i++) {
        // TODO: Add temp variable that captures column value using this guy (this.props.queryResponse.fields.dimensions[i].name.value)
        let column_name = this.props.queryResponse.fields.dimensions[i].name

        console.log(column_name)

        // X Axis: Close Date Dimension
        if(column_name == "opportunity.close_date") {
          let dateAsArray = data_array[x][column_name].value.split("-") // splits a date string into a three-piece array
          let year = parseInt(dateAsArray[0])
          let month = parseInt(dateAsArray[1])
          let day = parseInt(dateAsArray[2])

          temp_json_blob.x = (Date.UTC(year,month,day))
        }
        // Y Axis: Days Open Dimension
        else if(column_name == "opportunity.days_open") {
          temp_json_blob.y = data_array[x][column_name].value
        }
        // Tooltip Header: Opportunity Name
        else if(column_name == "opportunity.name") {
          temp_json_blob.name = data_array[x][column_name].value
        }
        // Marker Color: Probability
        else if(column_name == "opportunity.probability") {
          let probability = data_array[x][column_name].value

            // Color Assignment
            // @TODO: Ask user for X number of colors. Then with that hex code array, create equally sized buckets
            if (probability > 50) {
              temp_json_blob.color = "#0000FF"
            } 
            else {
              temp_json_blob.color = "#FF0000"
            }
        }
        // Marker Radius: Deal Size
        else if(column_name == "opportunity.probability") {
          // Some jank scaling, might want to use log to get the right proportions?
          temp_json_blob.marker = {radius: data_array[x][column_name].value*scaling_factor}
        }
      }

      // temp_json_blob should be ready to go for Highcharts now
      dataToRender.push(temp_json_blob)
    }

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
