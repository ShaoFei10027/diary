import React, { PureComponent } from 'react'
import { Table } from 'antd';

// 以字符串形式获取obj里的值
const getValueByKeys = (keysArr: Array<any>, obj: object, index?: number) => {
  const item = keysArr[index || 0];
  if (!index) {
    return getValueByKeys(keysArr, obj[item], 1)
  } else if (keysArr.length - 1 > index) {
    return getValueByKeys(keysArr, obj[item], index + 1)
  } else if (keysArr.length -1 === index) {
    return obj[item];
  }
}

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
