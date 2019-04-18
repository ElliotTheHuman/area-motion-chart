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
    
    // Split the data so we can end up in this format for our dates: Date.UTC(2015, 11, 01)
    let predataToRender = this.props.data.map(d => {
      return [(d[this.props.queryResponse.fields.dimensions[0].name].value).split("-"),d[this.props.queryResponse.fields.dimensions[1].name].value, d[this.props.queryResponse.fields.dimensions[2].name].value]
    })

    // Want to end up with an array that is filled with [x,y] arrays, i.e. multiple two value arrays
    let dataToRenderAsArray = predataToRender.map(d => {
      return [Date.UTC(parseInt(d[0][0]),parseInt(d[0][1])-1,parseInt(d[0][2])), d[1], d[2]]
    })

    // Now we want to end up with an array of JSON blobs rather than an array of arrays like we have right now
    // Start with an empty array, and we'll push in JSON blobs that are equivalent to the arrays in dataToRenderAsArray
    let dataToRender =[]

    dataToRenderAsArray.forEach(function(element) {
      // Start with an empty blob
      let some_json_blob = {}

      some_json_blob.x = element[0]
      some_json_blob.y = element[1]
      some_json_blob.name = element[2]

      // plop the filled array into dataToRender
      dataToRender.push(some_json_blob)
    })

    // Checking stuff
    console.log(dataToRender)    

    // Elliot Note: Needed to reverse the dataToRender array since the data was backwards
    dataToRender = dataToRender.reverse()

    // So we create a Sparkline component with these specifications
    const scatter_chart = (
      <Scatter
        key="scatter_chart"
        color={this.props.config.color}
        config={this.props.config}
        data={dataToRender}
        seriesName="Cryptic Commands"
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
