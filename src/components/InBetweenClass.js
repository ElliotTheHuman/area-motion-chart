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

/*
    // Refactored creation of dataToRenderAsArray
    // But this is super freakin' slow. Why is it so slow compared to the code below?
  
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

          let dateAsArray = (dataRaw[i][this.props.queryResponse.fields.dimensions[j].name].value).split("-")
          let dateAsEpoch = Date.UTC(parseInt(dateAsArray[0]), parseInt(dateAsArray[1])-1, parseInt(dateAsArray[2]))

          temp_array.push(dateAsEpoch)
        }
        // Otherwise we just push the dimenison value in
        else {
          temp_array.push(dataRaw[i][this.props.queryResponse.fields.dimensions[j].name].value)
        }
      }

      
      //  By the end we want an array that has these things:
      //  (1) date in epoch - X-axis
      //  (2) days open - Y-axis
      //  (3) opportunity name - Tooltip Title
      //  (4) probability - Marker Color
      //  (5) amount, aka ACV - Marker size

      dataToRenderAsArray.push(temp_array)
    }
*/

    let predataToRender = this.props.data.map(d => 
    {
      console.log(d)

      let temp_array
      let numberOfDimensions = this.props.queryResponse.fields.dimensions.length

      for(let i = 0; i < numberOfDimensions; i++) {
        if(i = 0) {
          dateAsArray = d[this.props.queryResponse.fields.dimensions[i].name].value.split("-") // splits a date string into a three-piece array
          year = parseInt(dateAsArray[0])
          month = parseInt(dateAsArray[1])
          day = parseInt(dateAsArray[2])

          temp_array.push(Date.UTC(year,month,day))
        }
        else {
          temp_array.d[this.props.queryResponse.fields.dimensions[i].name].value
        }
      }

      return temp_array
    })

    // Want to end up with an array that is filled with [x,y] arrays, i.e. multiple two value arrays
    // let dataToRenderAsArray = predataToRender.map(d => {
    //   return [Date.UTC(parseInt(d[0][0]),parseInt(d[0][1])-1,parseInt(d[0][2])), d[1], d[2], d[3], d[4]]
    // })

    // Now we want to end up with an array of JSON blobs rather than an array of arrays like we have right now
    // Start with an empty array, and we'll push in JSON blobs that are equivalent to the arrays in dataToRenderAsArray
    let dataToRender =[]

    predataToRender.forEach(function(element) {
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
