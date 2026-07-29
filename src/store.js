import { create } from 'zustand'
import { carColors } from './utils/carColors'

export const useColorStore = create((set) => ({
    carColor: carColors['black'],
    setCarColor: (changedColor) => set({ carColor: changedColor }),
    setColor: (part, color) =>
        set((state) => ({
            carColor: { ...state.carColor, partsColor: { ...state.carColor.partsColor, [part]: color } },
        })),
}))