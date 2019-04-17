import React from 'react'
import styled from 'styled-components'

import Area from './Scatter'

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
    
    // Want to end up with an array that is filled with [x,y] arrays, i.e. multiple two value arrays
    let dataToRender = this.props.data.map(d => {
      return [Highcharts.dateFormat("%Y-%m-%d", d[this.props.queryResponse.fields.dimensions[0].name].value),d[this.props.queryResponse.fields.dimensions[1].name].value]
    })

    // Elliot Note: Needed to reverse the dataToRender array since the data was backwards
    dataToRender = dataToRender.reverse()

    // So we create a Sparkline component with these specifications
    const area_chart = (
      <Area
        key="area_chart"
        color={this.props.config.sparkline_color}
        config={this.props.config}
        data={dataToRender}
      />
    )

    let layout = [area_chart]


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
