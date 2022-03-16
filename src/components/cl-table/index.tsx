import React, { PureComponent } from 'react'
import { Table } from 'antd';

export default class ClTable extends PureComponent<TableNS.PropsType, any> {
  state = {
    loading: true,
  }
  componentDidMount() {
    const { request, search } = this.props;
    if (typeof request === 'function') {
      request({
        ...search,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    
  }
  
  render() {
    const { loading } = this.state;
    return (
      <Table
        loading={loading}
        dataSource={[]}
      />
    )
  }
}
