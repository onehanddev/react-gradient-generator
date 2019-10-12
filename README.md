# gradient-generator

> A color gradient generator between any two colors with a

[![NPM](https://img.shields.io/npm/v/gradient-generator.svg)](https://www.npmjs.com/package/gradient-generator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-gradient-generator
```

## Usage

```jsx
import React, { Component } from "react";

import GradientGenerator from "react-gradient-generator";

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { startColor: "#ff0000", endColor: "#ffffff", steps: 5 };
  }

  getGradients(gradients) {
    console.log(gradients); // ["rgb(255, 51, 51)", "rgb(255, 102, 102)", "rgb(255, 153, 153)", "rgb(255, 204, 204)", "rgb(255, 255, 255)"]
  }
  render() {
    return (
      <GradientGenerator
        startColor={this.state.startColor}
        endColor={this.state.endColor}
        steps={this.state.steps}
        getGradients={this.getGradients}
      />
    );
  }
}

```

## License

MIT © [hakimuddinhh](https://github.com/hakimuddinhh)
