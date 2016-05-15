
  export class SearchSettings {
       OperatorList :Array<number>;
       ConnectionTypeList: Array<number>;
       CountryList:Array<number>;
       UsageTypeList:Array<number>;
       StatusTypeList:Array<number>;
       MinPowerKW:number;
       MaxPowerKW:number;
       UseDistanceInKM:boolean;
       
       constructor(){
         this.OperatorList = [];
         this.ConnectionTypeList=[];
         this.CountryList=[];
         this.UsageTypeList=[];
         this.StatusTypeList=[];
         
         //TODO: reference data filtered by country (most popular for given country ids)
       }
       
       public LoadSettings(){
         
       }
       public SaveSettings(){
         
       }
    }
