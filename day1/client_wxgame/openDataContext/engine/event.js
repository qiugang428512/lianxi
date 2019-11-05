const ImageCache = {};

export default class Event {
    static eventlist = [];
    static emit(event) {
        for (let i of eventlist) {
            if (event == i.event) {
                event.callback.call(event.callthis);
            }
        }
    }
    static on(event, callback, callthis) {
        eventlist.push({ event: event, callback: callback, callthis, callthis });
    }
    static once(event, callback, callthis) {
        remove(event, callback, callthis);
        eventlist.push({ event: event, callback: callback, callthis, callthis });
    }
    static remove(event, callback, callthis) {
        for (let i = eventlist.length - 1; i >= 0; i--) {
            let obj = eventlist[i];
            if (obj.event === event && obj.callback === callback && obj.callthis === callthis) {
                eventlist.splice(i, 1);
            }
        }
    }
}