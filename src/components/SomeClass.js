import React from 'react'
import styled from 'styled-components'

import Area from './Area'

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
    if (!this.props.done) {
      return <div>Loading...</div>
    }
    
    // input data array, output a transformed data array
    // grab the first/leftmost measure and grab every value of that measure
    let dataToRender = this.props.data.map(d => {
      return d[this.props.queryResponse.fields.measures[0].name].value
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
