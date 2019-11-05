// module model {
	/**
	 * 成语注释
	 */
	export class WordInfoVO {
		public pron: string;
		public word: string;
		public source: string;
		public expl: string;
		
		public constructor(obj: any) {
			//如果数据的变量类型都是简单类型可以用super()方法自动复制,否则请不要用super方法复制
			if (obj == null) {
				return;
			}
			for (var i in obj) {
				this[i] = obj[i];
			}
		}

		public toObject(): any {
			return this;
		}
	}

// }