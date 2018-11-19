import myajax from '@/api/myajax'

export default {
    getaccount(cb){
        myajax.axios({
            method:'get',
            url:'Wl_Inshop_Device_Record_RuiWein/ModelCheckWorkRecordAsync?param.accountId=201&param.translateId=1&param.year=2018&param.month=9',
            responseType:'json',
            data:{},
            success:(data)=> {
                cb(data)
              
               
           
            }
        })
    }

}