import EngineUtility from "../../../script/patch/EngineUtility";
export default class LevelClientConfig {
		public id : number;
	public None : string;
	public time : number;
	public img1 : string;
	public img2 : string;
	public point1 : json;
	public point2 : json;
	public point3 : json;
	public point4 : json;
	public point5 : json;
	public rimg1 : string;
	public rimg2 : string;


    static GetData(sheetName:string, key:any): LevelClientConfig {
		EngineUtility.assert(this._configData[sheetName], "load sheet failed! %s", sheetName);
        return this._configData[sheetName][key];
    };

    private static _configData = function(){
        EngineUtility.InitCallback.push(()=>{
           LevelClientConfig.LoadConfig('Data')

        });
        return {};
    }();


    private static LoadConfig(sheetName) {
        LevelClientConfig._configData[sheetName] = {};
        Laya.loader.load("res/conf/LevelClient_" + sheetName + ".json", Laya.Handler.create(this, (jsonObj)=>{
            for (let jsonData of jsonObj) {
                let newData = new LevelClientConfig();
                newData.id = Number(jsonData.id);
newData.None = String(jsonData.None);
newData.time = Number(jsonData.time);
newData.img1 = String(jsonData.img1);
newData.img2 = String(jsonData.img2);
newData.point1 = (jsonData.point1);
newData.point2 = (jsonData.point2);
newData.point3 = (jsonData.point3);
newData.point4 = (jsonData.point4);
newData.point5 = (jsonData.point5);
newData.rimg1 = String(jsonData.rimg1);
newData.rimg2 = String(jsonData.rimg2);

                LevelClientConfig._configData[sheetName][jsonData.id] = newData;
            }
        }));
    }
}