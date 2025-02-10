import { create } from "zustand";

type TToken = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useToken = create<TToken>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
}));
