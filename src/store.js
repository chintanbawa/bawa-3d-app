import { create } from 'zustand'

export const useColorStore = create((set) => ({
    colors: {
        exterior: '#000',
        grills: '#fff',
        light_tire_cap: '#fff',
        window_glass: '#ccc',
        rim_spokes: '#f00',
        body_base: '#f00',
        engine_pipes: '#f00',
        fan: '#ccc',
        side_mirrors: '#ccc',
        interior: '#f00',
        back_light: '#f00',
        gear_lever: '#f00',
        tires: '#000'
    },
    setColor: (part, color) =>
        set((state) => ({
            colors: { ...state.colors, [part]: color },
        })),
}))