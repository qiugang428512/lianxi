import Sprite from './sprite';
import Item from '../view/rank/item';
import Def from '../def';

const MAX_OFFSET = 50;
export default class List extends Sprite {
    constructor(w, h, cellheight) {
        super();
        this.repeatY = 5;
        this.repeatX = 1;
        this.dataSource = [];
        this.width = w;
        this.height = h;
        this.itemHeight = cellheight;
        this._startIndex = 0;
        this.cells = [];
        this.scrollY = 0;
        this.bindEvent();
    }
    destroy() {
        super.destroy();
        this.removeEvent();
    }
    removeEvent() {
        if (this._startTouch) {
            wx.offTouchStart(this._startTouch);
            this._startTouch = null;
        }
        if (this._moveTouch) {
            wx.offTouchStart(this._moveTouch);
            this._moveTouch = null;
        }
        if (this._endTouch) {
            wx.offTouchStart(this._endTouch);
            this._endTouch = null;
        }
    }
    setContentSize() {
        if (this.parent) {
            this.parent.height = this.itemHeight * this.repeatY;
            this.parent.resetHeight();
        }
    }
    set bgColor(value) {
        this._bgColor = value;
    }
    get bgColor() {
        return this._bgColor
    }
    set array(value) {
        this.dataSource = value;
        this.renderItems();
        this.setContentSize();
    }
    renderItems(cell, index) {
        this.dataSource.forEach((it, index) => {
            if (index > this.repeatY) {
                return;
            }
            let item = new Item(this.width, this.itemHeight);
            item.pos(0, this.itemHeight * index);
            item.dataSource = it;
            this.addChild(item);
            this.cells.push(item);
        });
        this.height = this.repeatY * this.itemHeight;
        this.totalHeight = this.dataSource.length * this.itemHeight;
    }
    updateItem(scrollValue) {
        var index = Math.floor(-scrollValue / this.itemHeight);
        var num = 0,
            toIndex;
        if (index > this._startIndex) {
            num = index - this._startIndex;
            var down = true;
            this._startIndex = index;
            toIndex = this._startIndex + this.repeatY;
        } else if (index < this._startIndex) {
            num = this._startIndex - index;
            down = false;
            this._startIndex = index;
            toIndex = this._startIndex;
        }
        if (!num) return;

        var cellIndex = 0;
        for (var i = 0; i < num; i++) {
            if (down) {
                var cell = this.cells.shift();
                this.cells.push(cell);
                cellIndex = this.cells.length;
            } else {
                cell = this.cells.pop();
                this.cells.unshift(cell);
            }
            var pos = (toIndex - i) * this.itemHeight;
            cell.y = pos;
        }
        this.cells.forEach((it, i) => {
            this.updateItemData(this.dataSource[i + index], i);
        });
    }
    updateItemData(cell, cellIndex) {
        this.cells[cellIndex].dataSource = cell;
    }
    canDragable(x, y) {
        x = x / Def.SCALE;
        y = y / Def.SCALE;
        let xy = this.localToGlobal(0, 0);
        if (x < xy[0] || x > xy[0] + this.width ||
            y < xy[1] || y > xy[1] + this.height) {
            return false
        }
        return true
    }
    bindEvent() {
        let startX, startY, depY;
        let that = this,
            startTop = 0,
            endTop = 0,
            startTime = 0,
            endTime = 0;

        var f = 0;
        let start = 0,
            begin = 0,
            distance = 0,
            during = 40,
            speed;

        let frameid = null;
        this._startTouch = function (e) {
            cancelAnimationFrame(frameid);
            if (!e.changedTouches.length) {
                return
            }
            let point = e.changedTouches[0];
            startX = point.clientX;
            startY = point.clientY;
            if (!that.canDragable(startX, startY)) {
                return;
            }
            startTop = point.clientY;
            startTime = new Date().getTime();
        }

        this._moveTouch = function (e) {
            cancelAnimationFrame(frameid);
            if (e.changedTouches.length) {
                let point = e.changedTouches[0];
                if (!that.canDragable(point.clientX, point.clientY)) {
                    return;
                }
                depY = point.clientY - startY;
                if (depY < 0 && that.totalHeight - that.height + MAX_OFFSET + that.y < 0) {
                    return;
                }
                if (depY > 0 && that.y - MAX_OFFSET > 0) {
                    return;
                }
                if (that.y < 0 && that.y > that.height - that.totalHeight) {
                    that.scrollY += depY;
                    that.updateItem(that.y);
                }
                startY = point.clientY;
                that.y += depY;
            }
        }

        this._endTouch = function (e) {
            cancelAnimationFrame(frameid);
            if (!e.changedTouches.length) {
                return
            }
            endTime = new Date().getTime();
            endTop = e.changedTouches[0].clientY;

            depY = endTop - startY;
            startY = endTop;

            start = 0;
            begin = that.y;

            if (depY < 0 && that.totalHeight - that.height + that.y < 0) {
                // bottom
                distance = that.height - that.totalHeight - that.y;
            } else if (depY >= 0 && that.y > 0) {
                // top
                distance = -that.y;
            } else {
                // 惯性运动
                speed = (endTop - startTop) / (endTime - startTime);
                distance = speed * 1200;
                if (endTop - startTop > 0 && begin + distance > 0) {
                    distance = -begin;
                } else if (endTop - startTop < 0 && (begin + distance) < (that.height - that.totalHeight)) {
                    distance = that.height - that.totalHeight - that.y;
                }
            }

            if (that.y < 0 && that.y > that.height - that.totalHeight) {
                that.scrollY += depY;
                that.updateItem(that.y);
            }
            tween();
            startTop = endTop;
        }

        wx.onTouchStart(this._startTouch);

        wx.onTouchMove(this._moveTouch);

        wx.onTouchEnd(this._endTouch);

        function tween() {
            var left = that.cubicEaseOut(start, begin, distance, during);
            that.y = left;
            start++;
            if (that.y < 0 && that.y > that.height - that.totalHeight) {
                that.scrollY += depY;
                that.updateItem(that.y);
            }
            if (start <= during) {
                frameid = requestAnimationFrame(tween);
            } else {
                cancelAnimationFrame(frameid);
            }
        }
    }
    cubicEaseOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
}