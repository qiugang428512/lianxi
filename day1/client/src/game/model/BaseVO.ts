/**
* created by yahu
* 
*/
export default class BaseVO {
    /**
    * 构造函数
    */
    constructor(obj: any = null) {
        //如果数据的变量类型都是简单类型可以用super()方法自动复制,否则请不要用super方法复制
        if (obj == null) {
            return;
        }
        for (var i in obj) {
            this[i] = obj[i];
        }
    }

    /**
     * 深克隆
     */
    public deepClone(): any {
        var proto = Object.getPrototypeOf(this);
        var obj = Object.assign({}, Object.create(proto), this);
        return obj;
    }
}