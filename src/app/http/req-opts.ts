/**
 * Created by Administrator on 2017/3/3.
 */
export class ReqOpts {
  constructor(public url: string,
              public data?: any,
              public success?: any,
              public failure?: any,
              public error?: any) {
  }
}
