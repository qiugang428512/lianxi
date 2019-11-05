export default class GameEvent extends Laya.Event {
	public Param: any;
	constructor(type: string, param?: any) {
		super();
		this.type = type;
		this.Param = param;
	}
}