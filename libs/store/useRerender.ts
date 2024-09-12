import { create } from 'zustand'

interface RerenderState {
  render: boolean
  rerender: () => void
}

const useRerender = create<RerenderState>((set) => ({
  render: false,
  rerender: () => set((state) => ({ render: !state.render })),
}))

export default useRerender
