import React, { PureComponent } from 'react';
import { Route, Link } from "react-router-dom";
import Navbar from '../Navbar';

export default class MainLayout extends PureComponent {

  render() {
    const {component: Component, ...rest} = this.props;

    return (
      <Route {...rest} render={matchProps => (
        <div className="DefaultLayout">
          <Navbar/>
          <div style={{padding: '16px'}}>
            <Component {...matchProps} />
          </div>
        </div>
      )} />
    )
  }

}
