import * as React from 'react';

export interface HelloProps {
  firstName: string;
  lastName: string;
}

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return <h1>Hello {this.props.firstName} {this.props.lastName}</h1>;
  }
}
