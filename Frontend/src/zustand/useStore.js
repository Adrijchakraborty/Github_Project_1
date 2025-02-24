import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  loading: false,
  setLoading : (data)=> set({loading : data}),
  setUser: (data) => set({ user: data}),
  removeUser: () => set({ user: null }),
}))

export default useStore;