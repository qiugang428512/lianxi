/**
 * 简单的A*寻路算法 8方向
 * @author tangweicheng
 */
export default class AStarPathfindingUtils {

    private static _INST: AStarPathfindingUtils;

    private _aStartNodePool: AStarNode[] = [];

    public static get Inst(): AStarPathfindingUtils {
        if (AStarPathfindingUtils._INST == null) {
            AStarPathfindingUtils._INST = new AStarPathfindingUtils();
        }
        return AStarPathfindingUtils._INST;
    }
    constructor() {

    }
    private _getAStarNodeFromPool(row: number, col: number, parent: AStarNode = null, canPass: boolean = true): AStarNode {
        let node: AStarNode;
        if (this._aStartNodePool.length > 0) {
            node = this._aStartNodePool.shift();
            node.Init(row, col, parent, canPass);
        }
        else {
            node = new AStarNode(row, col, parent, canPass);
        }
        return node;
    }

    private _pushAStarNodeToPool(node: AStarNode) {
        if (node) {
            this._aStartNodePool.push(node);
        }
    }

    private _returnMapNodeToPool(map: AStarNode[][]) {
        for (let i = 0; i < map.length; i++) {
            if (map[i]) {
                for (let j = 0; j < map[i].length; j++) {
                    this._pushAStarNodeToPool(map[i][j]);
                }
            }
        }
    }
    /**
     * 获得A*路径
     * @param fromRow 
     * @param fromCol 
     * @param toRow 
     * @param toCol 
     * @param aStarBoolMap 传递一个已二维数组索引为坐标的地图，bool值为true是可通过区域
     */
    public FindPath(fromRow: number, fromCol: number, toRow: number, toCol: number, aStarBoolMap: boolean[][]): { row: number, col: number }[] {
        let aStarMap = this.GetAStarMap(aStarBoolMap);
        let startNode = aStarMap[fromRow][fromCol];
        let endNode = aStarMap[toRow][toCol];
        let openList: AStarNode[] = [];
        this.BinaryInsertToOpenList(openList, startNode);
        while (openList.length > 0) {
            let curMinFNode = openList[0];//已排好序 第一个就是F值最小的
            curMinFNode.IsClose = true;
            openList.shift();
            let aroundNodeList = this.GetAroundAndCanPassNodes(curMinFNode, aStarMap);//当前节点周围可到达的节点
            this._nodesCloseFilter(aroundNodeList);

            let isOpenListInsert = false;
            for (let i = 0; i < aroundNodeList.length; i++) {
                let aroundNode = aroundNodeList[i];
                if (openList.indexOf(aroundNode) >= 0) {
                    //如果周围节点已经在open列表，则需要判断是否更新更小的G值
                    let nowG = this._calcG(aroundNode, curMinFNode);
                    if (nowG < aroundNode.G) {
                        aroundNode.UpdateParent(curMinFNode, nowG);
                    }
                }
                else {
                    //否则把它添加进open列表, 把当前格作为这一格的父节点, 计算这一格的 FGH
                    aroundNode.parentNode = curMinFNode;
                    this._calcFGH(aroundNode, endNode);
                    this.BinaryInsertToOpenList(openList, aroundNode);
                }
            }


            if (openList.indexOf(endNode) >= 0) { //Find path successful!
                let pathList: { row: number, col: number }[] = [];
                let curNode = endNode;
                while (curNode != null) {
                    let temp: { row: number, col: number } = { row: curNode.row, col: curNode.col }
                    pathList.unshift(temp);
                    curNode = curNode.parentNode;
                }
                this._returnMapNodeToPool(aStarMap);
                return pathList;
            }
        }
        this._returnMapNodeToPool(aStarMap);
        return null;
    }

    public GetAroundAndCanPassNodes(node: AStarNode, nodeMap: AStarNode[][]): AStarNode[] {
        let up: AStarNode = null, down: AStarNode = null, left: AStarNode = null, right: AStarNode = null;
        let lu: AStarNode = null, ru: AStarNode = null, ld: AStarNode = null, rd: AStarNode = null;
        if (node.row > 0) {
            up = nodeMap[node.row - 1][node.col];
        }
        if (node.col > 0) {
            left = nodeMap[node.row][node.col - 1];
        }
        if (node.row < nodeMap.length - 1) {
            down = nodeMap[node.row + 1][node.col]
        }
        if (node.col < nodeMap[node.row].length - 1) {
            right = nodeMap[node.row][node.col + 1]
        }

        if (up != null && left != null) {
            lu = nodeMap[node.row - 1][node.col - 1];
        }
        if (up != null && right != null) {
            ru = nodeMap[node.row - 1][node.col + 1];
        }
        if (down != null && left != null) {
            ld = nodeMap[node.row + 1][node.col - 1];
        }
        if (down != null && right != null) {
            rd = nodeMap[node.row + 1][node.col + 1];
        }

        let list: AStarNode[] = [];
        if (down != null && down.CanPass) {
            list.push(down);
        }
        if (up != null && up.CanPass) {
            list.push(up);
        }
        if (left != null && left.CanPass) {
            list.push(left);
        }
        if (right != null && right.CanPass) {
            list.push(right);
        }
        if (lu != null && lu.CanPass && left.CanPass && up.CanPass) {
            list.push(lu);
        }
        if (ld != null && ld.CanPass && left.CanPass && down.CanPass) {
            list.push(ld);
        }
        if (ru != null && ru.CanPass && right.CanPass && up.CanPass) {
            list.push(ru);
        }
        if (rd != null && rd.CanPass && right.CanPass && down.CanPass) {
            list.push(rd);
        }

        return list;
    }

    /**
     * 过滤当前数组中colse表已有的元素
     * @param nodeList 
     * @param closeList 
     */
    private _nodesCloseFilter(nodeList: AStarNode[]) {
        for (let i = nodeList.length - 1; i >= 0; i--) {
            if (nodeList[i].IsClose) {
                nodeList.splice(i, 1);
            }
        }
    }
    /**
     * 格子为正方形的计算G的算法
     * @param nowNode 
     * @param parent 
     */
    private _calcG(nowNode: AStarNode, parent: AStarNode) {
        let G = 10;
        if (nowNode.row != parent.row && nowNode.col != parent.col) {
            G = 14;
        }
        return G + parent.G;
    }
    /**
     * F = G + H
     * @param now 
     * @param end 
     */
    private _calcFGH(now: AStarNode, end: AStarNode) {
        let h = (Math.abs(end.col - now.col) + Math.abs(end.row - now.row)) * 10;//就直接横竖偏移值来估计H值
        let g: number = 0;
        if (now.parentNode) {
            g = this._calcG(now, now.parentNode);
        }
        let f = g + h;
        now.F = f;
        now.G = g;
        now.H = h;
    }


    // /**
    //  * 用一个bool二维数组来生成A*节点地图
    //  * @param mapBool false表示不能通过
    //  */
    public GetAStarMap(mapBool: boolean[][]): AStarNode[][] {
        let map: AStarNode[][] = [];
        for (let i = 0; i < mapBool.length; i++) {
            map[i] = [];
            let mapChildList = map[i];
            let mapBoolChildList = mapBool[i];
            if (mapBoolChildList) {
                for (let j = 0; j < mapBoolChildList.length; j++) {
                    let node = this._getAStarNodeFromPool(i, j, null, mapBoolChildList[j]);
                    mapChildList[j] = node;
                }
            }
        }
        return map;
    }

    /**
     * openList的二分法插入节点 升序
     * @param openList 
     * @param node 
     */
    public BinaryInsertToOpenList(openList: AStarNode[], node: AStarNode) {
        if (openList.length == 0) {
            openList.push(node);
        }
        else {
            let low = 0;
            let high = openList.length - 1;
            let mid = -1
            while (low <= high) {
                mid = low + Math.floor((high - low) / 2);
                if (node.F < openList[mid].F) {
                    high = mid - 1;
                }
                else {
                    low = mid + 1;
                }
            }
            openList.splice(low, 0, node);//插入到low索引位置
        }
    }

}

class AStarNode {
    public parentNode: AStarNode;
    public F: number;//F=G+H
    public G: number;//从起点移动到指定方格的移动代价，沿着到达该方格而生成的路径
    public H: number;//从指定的方格移动到终点的估算成本

    public row: number;//行
    public col: number;//列

    public CanPass: boolean;//是否能通过
    public IsClose: boolean;

    constructor(row: number, col: number, parent: AStarNode = null, canPass: boolean = true) {
        this.Init(row, col, parent, canPass)
    }

    public Init(row: number, col: number, parent: AStarNode = null, canPass: boolean = true) {
        this.row = row;
        this.col = col;
        this.parentNode = parent;
        this.CanPass = canPass;

        this.IsClose = false;
        this.F = this.G = this.H = 0;
    }

    /**
     * 计算f
     */
    public CalcF() {
        this.F = this.G + this.H;
    }


    public UpdateParent(parent: AStarNode, g: number) {
        this.parentNode = parent;
        this.G = g;
        this.CalcF();
    }
}