export default class WordStruct {
    public Loc: number;//单个字在成语中位置
    public Idiom: string;//所在成语
    public Level: number;//难度等级
    public Len: number;//成语长度

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