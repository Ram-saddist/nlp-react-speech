import React, { Component } from 'react'

export default class SpeackComponent extends Component {
  render() {
    return (
      <div>
        <h1 style={{fontSize:"3rem"}}>{this.state.count}</h1>
      </div>
    )
  }
}
