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
    
    console.log(this.props.data)
    console.log(this.props.queryResponse.fields.dimensions)

    let numberOfRows = this.props.data.length
    let numberOfDimensions = this.props.queryResponse.fields.dimensions.length
    let dataToRenderAsArray = []
    let dataRaw = this.props.data // array of data, each element is a JSON object representing a row
    
    // First loop iterates through every row of data
    for(let i = numberOfRows - 1; i >= 0; i--) {
      // We're going to pump temp_array into our dataToRenderAsArray array
      let temp_array = []

      // Second loop iterates through each column, grabbing the values of the dimensions for a given row
      for(let j = 0; j < numberOfDimensions; j++) {

        // If it's the first dimension, then we need to convert our date string into an epoch numerical value
        if(j = 0) {
          let dateAsArray = dataRaw[this.props.queryResponse.fields.dimensions[j].name].value.split("-")
          let year = parseInt(date[0])
          let month = parseInt(date[1])
          let day = parseInt(date[2])
          let dateAsEpoch = Date.UTC(year, month-1, day)

          temp_array.push(dateAsEpoch)
        }
        // Otherwise we just push the dimenison value in
        else {
          temp_array.push(dataRaw[this.props.queryResponse.fields.dimensions[j].name].value)
        }
      }

      dataToRenderAsArray.push(temp_array)
    }
      /* 
        By the end we want an array that has these things:
        (1) date in epoch - X-axis
        (2) days open - Y-axis
        (3) opportunity name - Tooltip Title
        (4) probability - Marker Color
        (5) amount, aka ACV - Marker size
      */

    // Now we want to end up with an array of JSON blobs rather than an array of arrays like we have right now
    // Start with an empty array, and we'll push in JSON blobs that are equivalent to the arrays in dataToRenderAsArray
    let dataToRender =[]

    dataToRenderAsArray.forEach(function(element) {
      // Start with an empty blob
      let some_json_blob = {}

      some_json_blob.x = element[0]
      some_json_blob.y = element[1]
      some_json_blob.name = element[2]

      // For now, if our prob is > 50, make the dot green. Otherwise, make it red.
      let probability = element[3]

      if (probability > 50) {
        some_json_blob.color = "#0000FF"
      } else {
        some_json_blob.color = "#FF0000"
      }

      // Use log to scale scatter dot size
      some_json_blob.marker = {}
      some_json_blob.marker.radius = (element[4])/100000*5

      /////////// Potential Colorizing function ///////////
      // https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
      /////////////////////////////////////////////////////

      // plop the filled array into dataToRender
      dataToRender.push(some_json_blob)
    }) 

    // Elliot Note: Needed to reverse the dataToRender array since the data was backwards
    dataToRender = dataToRender.reverse()

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
