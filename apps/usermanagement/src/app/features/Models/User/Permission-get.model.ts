
export interface IPermissionModel{
           Guid :  string ,
           PermissionCode :  string ,
           Name :  string ,
           KeyValue :  string ,
           Level :  string ,
           ParentCode :  string 
} 
export interface IPermissionResponseModel{
     ResponseStatus :  string ,
     Message :  string ,
     Ex : any,
     Data ?: IPermissionModel[],
}