/**
 * 数学工具类
 */
export default class MathUtils {
	/**
	 * 从两个数字之间随机取一个浮点数
	 * @param low 小值
	 * @param high 大值,不填就是0~小值
	 */
	public static randomBetween(low: number, high: number = null): number {
		if (high == null) {
			high = low;
			low = 0;
		}
		let ran: number = low + Math.floor(Math.random() * (high - low));
		return ran;
	}

	/**
	 * 从两个数字之间随机取一个整数
	 * @param low 小值
	 * @param high 大值,不填就是0~小值
	 */
	static randomBetween_Int(min: number, max: number): number {
		let n: number = MathUtils.randomBetween(min, max);
		return Math.floor(n);
	}

	/**
	 * 随机打乱数组
	 * @param list 
	 */
	public static randomSort(list: any[]) {
		if (list == null) {
			return null;
		}
		list.sort((a: any, b: any): number => {
			return 0.5 - Math.random();
		})
		return list;
	}

	/**
	 * 从数组中随机取出一个值
	 * @param list 
	 */
	public static getRDFromList(list: any[]): any {
		let len: number = list.length;
		let id: number = Math.floor(Math.random() * len);
		return list[id];
	}

	/**
	 * 权重随机取一个值
	 * @param str 根据冒号后的值计算权重 @example a:30,b:50,c:70,d:100
	 * @returns string
	 */
	public static getRDFromStr_1(str: string): any {
		let slist: string[] = str.split(",");
		let vlist: { key: string, value: number }[] = [];
		let max: number = 0;
		for (var i: number = 0; i < slist.length; i++) {
			let vstr: string = slist[i];
			let varr: string[] = vstr.split(":");
			let v: number = +varr[1];
			if (isNaN(v)) v = 0;
			let kv: any = { key: varr[0], value: v };
			max += v;
			vlist.push(kv);
		}
		if (vlist.length == 1) {
			return vlist[0].key;
		}
		let r: number = Math.random() * max;
		let last: number = 0;
		for (let i: number = 0; i < vlist.length; i++) {
			if (r >= last && r < (last + vlist[i].value)) {
				let key: string = vlist[i].key;
				return key;
			}
			last += vlist[i].value;
		}
		return null;
	}
}