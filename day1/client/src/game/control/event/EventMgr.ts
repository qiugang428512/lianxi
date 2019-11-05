export default class EventMgr extends laya.events.EventDispatcher {
	private static _INST: EventMgr;
	public constructor() {
		super();
	}
	public static get Inst(): EventMgr {
		if (EventMgr._INST == null) {
			EventMgr._INST = new EventMgr();
		}
		return EventMgr._INST;
	}
}
