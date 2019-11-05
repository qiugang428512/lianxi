import EngineUtility from "../../../script/patch/EngineUtility";
export default class achievementConfig {
		public id : number;
	public name : string;
	public icon : string;
	public levelname : string;
	public gradingNum : number;
	public starNum : number;
	public leveladdstar : number;
	public throughLevel : number;


    static GetData(sheetName:string, key:any): achievementConfig {
		EngineUtility.assert(this._configData[sheetName], "load sheet failed! %s", sheetName);
        return this._configData[sheetName][key];
    };

    private static _configData = function(){
        EngineUtility.InitCallback.push(()=>{
           achievementConfig.LoadConfig('Sheet1')

        });
        return {};
    }();


    private static LoadConfig(sheetName) {
        achievementConfig._configData[sheetName] = {};
        Laya.loader.load("res/conf/achievement_" + sheetName + ".json", Laya.Handler.create(this, (jsonObj)=>{
            for (let jsonData of jsonObj) {
                let newData = new achievementConfig();
                newData.id = Number(jsonData.id);
newData.name = String(jsonData.name);
newData.icon = String(jsonData.icon);
newData.levelname = String(jsonData.levelname);
newData.gradingNum = Number(jsonData.gradingNum);
newData.starNum = Number(jsonData.starNum);
newData.leveladdstar = Number(jsonData.leveladdstar);
newData.throughLevel = Number(jsonData.throughLevel);

                achievementConfig._configData[sheetName][jsonData.id] = newData;
            }
        }));
    }
}