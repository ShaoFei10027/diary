declare namespace TableNS {
  interface TableDataType {
    records: Array<object>;
    total?: number;
    pageSize?: number;
    pageNum?: number;
  }

  interface PropsType {
    /** function */
    request: (params: object) => Promise<any>;
    response: (res: any) => TableDataType;
    pagi: object;
    search: object;
    getData: string;
    [propName: string]: any;
  }
}