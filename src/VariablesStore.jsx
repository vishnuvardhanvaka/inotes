import { create } from 'zustand'

const useStore = create((set,get) => ({
    startProcess: false,
    storage:0,
    access_token:'',
    toggleStartProcess: (currentValue) => { set({ startProcess: !currentValue }) },
    resetStartProcess: () => { set({ startProcess: false }) },
    setStorage:(storage)=>{set({storage:storage})},
    getStorage:()=> (get().storage),
    setAccessToken:(access_token)=>{set({access_token:access_token})},
    getAccessToken:()=>(get().access_token),
}))
export default useStore;