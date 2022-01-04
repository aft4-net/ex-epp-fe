
export interface IPermissionModel{
           Guid :  string ,
           PermissionCode :  string ,
           Name :  string ,
           value :  string ,
           label :  string ,
           ParentCode :  string 
           checked:boolean
           indeterminate:boolean,
           checkAll:boolean
} 
export interface IPermissionResponseModel{
     ResponseStatus :  string ,
     Message :  string ,
     Ex : any,
     Data ?: IPermissionModel[],
}

export interface AllPermitionData{
Parent:IPermissionModel,
Childs:IPermissionModel[]
}