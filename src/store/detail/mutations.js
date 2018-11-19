import {DETAIL_DATA} from '@/store/mutation-types'
import {CART_STATS} from '@/store/mutation-types'

export default {
    [DETAIL_DATA] (state ,data) {
        state.product = {  
            AccountId: data.Result.AccountId,
            AccountName: data.Result.AccountName,
            Picture: data.Result.Picture,
            RoleName: data.Result.RoleName,
            TodayTopNo: data.Result.TodayTopNo,
            WorkStartTime: data.Result.WorkStartTime,
            WorkEndTime: data.Result.WorkEndTime,
            CheckList: data.Result.CheckList,
            DayText: data.Result.CheckList.DayText,
            
        }
    },

    [CART_STATS](state , data){
        state.stats = data
     
    }
}