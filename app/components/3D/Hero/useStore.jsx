import { create } from 'zustand'

const textures = ["1.jpeg", "2.jpeg", "3.jpeg"];

export const useStore = create((set) => ({
  index: 0, // Set default index to 2 for "2.jpeg"
  texture: textures[0], // Update default texture to "3.jpeg"
  setIndex: (num) => {
    if (num >= 0 && num < textures.length) {
      set({ index: num, texture: textures[num] });
    }
  },
  resetIndex: () => set({ index: 0, texture: textures[0] }),
  getCurrentTexture: () => set.getState().texture,
  getCurrentIndex: () => set.getState().index,
  getCurrentTextureIndex: () => textures.indexOf(set.getState().texture),
  getAllTextures: () => textures,
  getAllTexturesLength: () => textures.length}));
