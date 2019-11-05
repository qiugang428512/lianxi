/**
 * 字典类 
 * by Neil 
 */
export default class Dictionary<K, V>{
    /**键名集合 */
    private _keys: Array<K> = null;
    /**值集合 */
    private _values: Array<V> = null;
    /**
     * 构造函数 
     */
    constructor() {
        this._keys = new Array<K>();
        this._values = new Array<V>();
    }

    /**
     * 销毁函数 
     */
    public destroy(): void {

    }

    /**
     * 给指定的键名设置值。
     * @param key 键名
	 * @param value 值
	 */
    public setValue(key: K, value: V): void {
        let index = this.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    }

    /**
     * 获取指定对象的键名索引
	 * @param key 键名对象
	 * @return 键名索引
	 */
    public indexOf(key: K): number {
        return this._keys.indexOf(key);
    }

    /**
     * 是否包含键名
     * @param key 
     */
    public containsKey(key: K): boolean {
        return this._keys.indexOf(key) != -1;
    }

	/**
	 * 返回指定键名的值
	 * @param key 键名对象
	 * @return 指定键名的值
	 */
    public getValue(key: K): V {
        var index = this.indexOf(key);
        return index < 0 ? null : this._values[index];
    }

	/**
	 * 移除指定键名的值
	 * @param key 键名对象
	 * @return 是否成功移除
	 */
    public remove(key: K): boolean {
        var index = this.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    }

	/**
	 * 清除此对象的键名列表和键值列表。
	 */
    public clear(): void {
        this._values.splice(0, this._values.length);
        this._keys.splice(0, this._keys.length);
    }

	/**
	 * 获取所有的值列表
	 */
    public get values(): Array<V> {
        return this._values;
    }

	/**
	 * 获取所有的键名列表
	 */
    public get keys(): Array<K> {
        return this._keys;
    }

    /**
     * 遍历
     * @param callback 
     */
    public forEach(callback: (key: K, value: V) => any): void {
        for (let index = 0; index < this._keys.length; index++) {
            const key = this._keys[index];
            const value = this._values[index];
            const ret = callback(key, value);
            if (ret === false) {
                return;
            }
        }
    }

    /**
     * 获取长度
     * @return 长度
     */
    public get length(): number {
        return this._values.length;
    }

    /**
     * 是否为空
     * @return 是否
     */
    public isEmpty(): boolean {
        return this._values.length <= 0;
    }
}