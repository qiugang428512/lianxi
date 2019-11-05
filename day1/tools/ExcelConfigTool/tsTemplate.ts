import EngineUtility from "../../../script/patch/EngineUtility";
export default class %configName%Config {
	%property%

    static GetData(sheetName:string, key:any): %configName%Config {
		EngineUtility.assert(this._configData[sheetName], "load sheet failed! %s", sheetName);
        return this._configData[sheetName][key];
    };

    private static _configData = function(){
        EngineUtility.InitCallback.push(()=>{
           %loadfunc%
        });
        return {};
    }();


    private static LoadConfig(sheetName) {
        %configName%Config._configData[sheetName] = {};
        Laya.loader.load("res/conf/%configName%_" + sheetName + ".json", Laya.Handler.create(this, (jsonObj)=>{
            for (let jsonData of jsonObj) {
                let newData = new %configName%Config();
                %cloneData%
                %configName%Config._configData[sheetName][jsonData.%keyName%] = newData;
            }
        }));
    }
}