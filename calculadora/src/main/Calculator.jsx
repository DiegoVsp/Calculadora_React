import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class Calculator extends Component {
  state = { ...initialState }

  constructor(props) {
    super(props)

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);

  }


  // função limpar
  clearMemory() {
    this.setState({ ...initialState })
  }
  // função setar Operação
  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      // operação armazenada antes
      const currentOperation = this.state.operation

      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

      } catch (e) {
        values[0] = this.state.value[0]
      }
      values[1] = 0

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }
  // funcao add digito
  addDigit(n) {
    // regra para evitar ter 2 pontos na calculadora
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    // se o clear display for true o valor vai ser vazio
    // se o display não for ser limpo vai pegar o this.state.displayValue
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    // passando o proprio displayValue de cima e uma vez que digita o valor e já limpou ali em cima 
    // eu coloco o clearDisplay como false
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({ values })
      console.log(values)
    }
  }

  render() {

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} />
      </div>
    )
  }
}

