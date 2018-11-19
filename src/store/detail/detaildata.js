import myajax from '@/api/myajax.js'

export default{
    getdata(cbdata,cb){
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        //console.log(cbdata.accountId)
        myajax.axios({
            method:'get',
            url:'Wl_Inshop_Device_Record_RuiWein/ModelCheckWorkRecordAsync?param.accountId='+cbdata.accountId+'&param.translateId='+cbdata.translateId+'&param.year='+year+'&param.month='+month,
            responseType:'json',
            data:{},
            success:(data)=> {
                cb(data)
               // console.log(localStorage.companyName+'11111111')
               
               
           
            }
        })

    }
}