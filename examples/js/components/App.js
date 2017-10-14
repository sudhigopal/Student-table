/* eslint max-len: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import '../../../css/react-bootstrap-table.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav className='navbar navbar-inverse'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='#'>react-bootstrap-table</a>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li>
                  <a href='#/getting-started'>Getting Started</a>
                </li>
                <li>
                  <a href='#/examples/column-filter'>DataItems</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Grid fluid>
          <Row>
            <Col lg={ 12 }>
              { this.props.children }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
