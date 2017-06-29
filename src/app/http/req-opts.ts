/**
 * Created by Administrator on 2017/3/3.
 */
export class ReqOpts {
  public url;
  public data;
  public success;
  public failure;
  public error;

  // 配置
  public processData: boolean; // 是否将数据处理成键值对
  public contentType: string | boolean; // 设置content-type请求头 当为false时，则不设置content-type，即为undefined

}
