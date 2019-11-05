// module model {
	export class ActivityNewVO {
		public id: number;
		public time_dialog: string;
		public dialog: string;
		public timestart: number;
		public timeend: number;
		public condition: number;
		public get_hero: number;
		public mode: number;
		public mode_dialog:string;
		public notice_timestart:number;

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