/**
 * Created by Administrator on 2017/7/4.
 */
export class Image {
  constructor(public url: string, // 图片地址
              public file_id: string, // 图片ID
              public selected?: boolean // 是否已选中
  ) {
  }
}
