import {  autorun , action, observable } from "mobx";


class GlobalStore {
    @observable currentType = "GlobalStore";
}

var store = window.store = new GlobalStore
export default new GlobalStore

autorun(()=>{
    console.log("GlobalStore.currentType: " + store.currentType)
})