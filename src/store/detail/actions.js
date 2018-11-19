import detaildata from './detaildata'
import {DETAIL_DATA} from '@/store/mutation-types'
import {CART_STATS} from '@/store/mutation-types'
import myajax from '@/api/myajax'

export default {

    getdetail(context,cbdata){
 setTimeout(()=>{
    detaildata.getdata(cbdata,(result) => {
        //console.log(result)
        context.commit(DETAIL_DATA,result)
    })
 },100)
    },
    setcartproducts(context ,cbdata){
        myajax.axios({
            method:'get',
            url:'Wl_Inshop_Device_Record_RuiWein/ModelCheckWorkRecordAsync?param.accountId=201&param.translateId=1&param.year=2018&param.month=8',
            responseType:'json',
            success:(result) => {
                //console.log('stats',result)
                console.log(this.$router)
                context.commit(CART_STATS,result)
            }
        })
    }
}