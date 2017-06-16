export class Rc4Util {

  public static decry_RC4(data: string, key: string): string {
    if (data == null || key == null) {
      return null;
    }
    return this.bytesToString(this.RC4Base(this.HexString2Bytes(data), key));
  }

  public static  encry_RC4_string(data: string, key: string): string {
    if (data == null || key == null) {
      return null;
    }
    return this.toHexString(this.bytesToString(this.encry_RC4_byte(data, key)));
  }

  private static encry_RC4_byte(data: string, key: string): number[] {
    if (data == null || key == null) {
      return null;
    }
    let b_data: number[] = this.stringToBytes(data);
    return this.RC4Base(b_data, key);
  }

  private static initKey(aKey: string): number[] {
    let b_key: number[] = this.stringToBytes(aKey);
    let state = new Array(256);

    for (let i = 0; i < 256; i++) {
      state[i] = i;
    }
    let index1 = 0;
    let index2 = 0;
    if (b_key == null || b_key.length === 0) {
      return null;
    }
    for (let i = 0; i < 256; i++) {
      index2 = ((b_key[index1] & 0xff) + (state[i] & 0xff) + index2) & 0xff;
      let tmp = state[i];
      state[i] = state[index2];
      state[index2] = tmp;
      index1 = (index1 + 1) % b_key.length;
    }
    return state;
  }

  private static toHexString(s: string): string {
    let str: string = '';
    for (let i = 0; i < s.length; i++) {
      let ch: number = s.charCodeAt(i);
      let s4: string = ch.toString(16);
      if (s4.length === 1) {
        s4 = '0' + s4;
      }
      str = str + s4;
    }
    return str;
  }

  private static HexString2Bytes(src: string): number[] {
    let size: number = src.length;
    let ret: number[] = new Array(size / 2);
    let tmp: number[] = this.stringToBytes(src);
    for (let i = 0; i < size / 2; i++) {
      ret[i] = this.uniteBytes(tmp[i * 2], tmp[i * 2 + 1]);
    }
    return ret;
  }

  private static stringToBytes(str): number[] {
    let ch: number = 0;
    let st: number[] = [];
    let re: number[] = [];
    for (let i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      st = [];
      do {
        st.push(ch & 0xFF);
        ch = ch >> 8;
      } while (ch);
      re = re.concat(st.reverse());
    }
    return re;
  }

  private static bytesToString(bytes: number[]) {
    let str = '';
    for (let i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return str;
  }

  private static uniteBytes(src0: number, src1: number): number {
    let _b0: number = parseInt(String.fromCharCode(src0), 16) << 4;
    let _b1: number = parseInt(String.fromCharCode(src1), 16);
    return _b0 ^ _b1;
  }

  private static RC4Base(input: number[], mKkey: string): number[] {
    let x = 0;
    let y = 0;
    let key: number[] = this.initKey(mKkey);
    let xorIndex: number;
    let result: number[] = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
      x = (x + 1) & 0xff;
      y = ((key[x] & 0xff) + y) & 0xff;
      let tmp: number = key[x];
      key[x] = key[y];
      key[y] = tmp;
      xorIndex = ((key[x] & 0xff) + (key[y] & 0xff)) & 0xff;
      result[i] = input[i] ^ key[xorIndex];
    }
    return result;
  }
}
