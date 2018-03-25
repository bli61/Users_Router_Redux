import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage, setTotalItems, setStatusCurPage } from '../../actions';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNums: []
    };
  }

  componentDidMount() {
    this.setCurPage(1);
  }

  componentDidUpdate(prevProps, prevState) {
    // reset pages if items array has been changed
    if (this.props.page.totalItems !== prevProps.page.totalItems) {
      this.setCurPage(this.props.status.curPage);
    }
  }

  setCurPage = curPage => {
    const { page, dispatch } = this.props;
    dispatch(setTotalItems());
    dispatch(fetchPage(curPage, page.pageSize));
    dispatch(setStatusCurPage(curPage));
    const { pageSize, startIndex, totalItems } = this.props.page;
    const pageNums = [];
    
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (page + 4 >= totalPages) {
        startPage = page - 9;
        endPage = totalPages;
      } else {
        startPage = page - 5;
        endPage = page + 4;
      }
    }
    console.log('start page: ', startPage);
    console.log('end page: ', endPage);
    for (let i = startPage; i <= endPage; i++) {
      pageNums.push(i);
    }
    this.setState({ pageNums });
  };



  render() {
    const pageProp = this.props.page;
    const pageNums = this.state.pageNums;
    const {totalItems, pageSize} = pageProp;
    const totalPages = Math.ceil(totalItems / pageSize);
    return (
      <ul className="pagination">
        <li className="page-item">
          {pageProp.curPage === 1 ? '' : <a className="page-link" onClick={() => this.setCurPage(pageProp.curPage - 1)} href="#">Previous</a>}
        </li>
        {pageNums.map(page => {
          return (
            <li key={page} className="page-item">
              <a onClick={() => this.setCurPage(page)} className="page-link" href="#">{page}</a>
            </li>
          );
        })}
        <li className="page-item">
          {pageProp.curPage === totalPages ? '' : <a onClick={() => this.setCurPage(pageProp.curPage + 1)} className="page-link" href="#">Next</a>}
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.page,
    status: state.status
  };
}

export default connect(mapStateToProps)(Pagination);