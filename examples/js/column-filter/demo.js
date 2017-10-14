/* eslint max-len: 0 */
import React from 'react';
import AllFilter from './all-filters';
class Demo extends React.Component {
  render() {
    return (
            <div className='col-md-offset-1 col-md-8'>
                <div className='panel panel-default'>
                    <div className='panel-heading'>All Types of Filters Example</div>
                    <div className='panel-body'>
                        <AllFilter />
                    </div>
                </div>
            </div>
    );
  }
}

export default Demo;
