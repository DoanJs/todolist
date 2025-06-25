import {create} from 'zustand';

const useModalNotiStore = create((set: any) => ({
  data: null,
  setDataModalNoti: (data: any) => set(() => ({data})),
}));

export default useModalNotiStore;
