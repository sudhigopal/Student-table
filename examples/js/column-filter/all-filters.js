import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const details = [];

function addProducts(quantity) {
  const startId = details.length;
  const startDate = new Date(2015, 0, 1);
  const endDate = new Date();
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    details.push({
      id: id,
      name: 'Item name ' + id,
      sdate: date,
      edate: date,
      location: 'San Ramon'
    });
  }
}

addProducts(100);

function dateFormatter(cell) {
  if (typeof cell !== 'object') {
    cell = new Date(cell);
  }

  return `${('0' + cell.getDate()).slice(-2)}/\
  ${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

// validator function pass the user input value and should return true|false.
function infoNameValidator(value) {
  const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
  if (!value) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must be inserted';
    response.notification.title = 'Requested Value';
  } else if (value.length < 10) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must have 10+ characters';
    response.notification.title = 'Invalid Value';
  }
  return response;
}

export default class CustomToolBarTable extends React.Component {

  createCustomToolBar = props => {
    return (
      <div style={ { margin: '20px' } }>
        { props.components.btnGroup }
      </div>
    );
  }
  renderShowsTotal(start, to, total) {
    return (
      <p style={ { color: 'black' } }>
        { start } to { to }, out of { total }&nbsp;&nbsp;
      </p>
    );
  }
  render() {
    const selectRow = {
      mode: 'checkbox',
      showOnlySelected: true
    };
    const options = {
      toolBar: this.createCustomToolBar,
      page: 0,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: details.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
    };
    return (
      <BootstrapTable data={ details }
        pagination={ true }
        options={ options }
        selectRow={ selectRow }
        cellEdit={ cellEditProp }
        insertRow
        deleteRow
        exportCSV>
        <TableHeaderColumn dataField='id' isKey={ true }>Student ID
        <br/><a onClick={ this.handlerClickCleanFiltered.bind(this) }
        style={ { cursor: 'pointer' } }>clear filters</a>
        </TableHeaderColumn>

        <TableHeaderColumn refs='name' dataField='name'
        filter={ { type: 'RegexFilter', placeholder: 'Ex: Jim' } }
        editable={ { type: 'textarea', validator: infoNameValidator } }>
        Student Name</TableHeaderColumn>

        <TableHeaderColumn refs='course' dataField='course'
        filter={ { type: 'RegexFilter', placeholder: 'Ex: hadoop' } }
        editable={ { type: 'textarea', validator: infoNameValidator } }>
        Course</TableHeaderColumn>

        <TableHeaderColumn refs='sdate'
        dataField='sdate' filter={ { type: 'DateFilter' } } dataFormat={ dateFormatter }
        editable={ { type: 'date' } }>
        Start Date</TableHeaderColumn>

        <TableHeaderColumn refs='edate'
        dataField='edate' filter={ { type: 'DateFilter' } } dataFormat={ dateFormatter }
        editable={ { type: 'date' } }>
        End Date</TableHeaderColumn>

      <TableHeaderColumn refs='location' dataField='location'
      filter={ { type: 'RegexFilter', placeholder: 'Ex: San Jose' } }
      editable={ { type: 'textarea', validator: infoNameValidator } }>
      Location</TableHeaderColumn>

      </BootstrapTable>
    );
  }
  handlerClickCleanFiltered() {
    this.refs.name.cleanFiltered();
    this.refs.course.cleanFiltered();
    this.refs.sdate.cleanFiltered();
    this.refs.edate.cleanFiltered();
    this.refs.location.cleanFiltered();
  }
}
