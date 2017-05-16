/**
 * Created by Administrator on 2017/3/2.
 */
export class ApiData {
  constructor(public code: number,
              public message?: string,
              public result?: object[],
              public total?: number) {
  }
}
