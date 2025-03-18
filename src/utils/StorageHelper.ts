/**
 * localStorage helper for not writing JSON.stringify and JSON.parse
 */
export class StHelper {
  /**
   * @example StorageHelper.setItem('asd', { obj: value })
   * @param {string} key
   * @param {any} value
   */
  static setItem (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * @example StorageHelper.getItem('asd')
   * @param {string} key
   *
   */
  static getItem (key: string) {
    return JSON.parse(localStorage.getItem(key)!)
  }

  static removeItem(key:string){
    localStorage.removeItem(key);
  }
}
