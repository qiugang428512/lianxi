// module model {
	export class InviteVO {

		public appId: string;
		public state: number;//0为邀请  1为领取  2为已领取
		public seq: number;//第几个邀请


		constructor(obj: any) {
			if (obj == null) {
				return;
			}
			for (var i in obj) {
				this[i] = obj[i];
			}

		}


	}

// }