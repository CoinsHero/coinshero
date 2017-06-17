import React from 'react';
import CoinsApiService from './CoinsApiService';

export default class Services extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CoinsApiService />
    );
  }
}
