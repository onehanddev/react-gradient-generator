import { Component } from 'react'
import PropTypes from 'prop-types'

export default class GradientGenerator extends Component {
  static propTypes = {
    startColor: PropTypes.string,
    endColor: PropTypes.string,
    steps: PropTypes.number,
    getGradients: PropTypes.func
  };

  render() {
    const { startColor, endColor, steps } = this.props
    const gradients = this.generateGradient(startColor, endColor, steps)
    if (gradients) {
      this.props.getGradients(gradients)
    } else {
      throw new Error('Cannot generate gradients, make sure start and color are in hex format !')
    }

    return null
  }

  generateGradient(start, end, steps) {
    // parse RGB values to each {Red, Green, Blue} keys
    let startRGB = this.hexToRgb(start)
    let endRGB = this.hexToRgb(end)
    let gradients = []

    // generate color for each steps provided then push the value to gradients array
    for (let step = 1; step <= steps; step++) {
      let colors = {}
      for (let color of ['red', 'green', 'blue']) {
        colors[color] = this.colorMaker(
          startRGB[color],
          endRGB[color],
          steps,
          step
        )
      }

      let rgb = `rgb(${colors['red']}, ${colors['green']}, ${colors['blue']})`;
      gradients.push(rgb)

      // inserting in the dom
      var node = document.createElement('div') // Create a <li> node
      node.style.backgroundColor = rgb
      document.querySelector('body').appendChild(node)
    }

    return gradients
  }

  colorMaker(start, end, steps, step) {
    // let redDiff = (start.red > end.red) ? start.red - end.red : end.red - start.red;

    let val
    if (start > end) {
      let singleStep = (start - end) / steps
      val = start - singleStep * step
    } else if (end > start) {
      let singleStep = (end - start) / steps
      val = start + singleStep * step
    } else {
      val = start | end
    }

    return ~~val
  }

  // strng to object converson
  parseRGB(rgb) {
    let baseSplit = rgb.split('(')[1].split(',')
    let red = parseInt(baseSplit[0], 1)
    let green = parseInt(baseSplit[1], 1)
    let blue = parseInt(baseSplit[2].split(')')[0], 1)

    return { red, green, blue }
  }

  showGradient(e) {
    let start = this.hexToRgb(this.state.startColor);
    let end = this.hexToRgb(this.state.endColor);
    let gradientColors = this.generateGradient(start, end, this.state.steps);
    this.setState({ gradientColors: gradientColors });
  }

  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16)
        }
      : null;
  }
}
