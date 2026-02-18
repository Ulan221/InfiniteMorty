import {Character} from "@/constants/types";
import {create} from "zustand";
import {getData} from "@/services/api/characterApi";

interface CharacterState {
    characters: Character[];
    page: number;
    isFetching: boolean;
    fetchCharacters: () => Promise<void>;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
    characters: [],
    page: 1,
    isFetching: false,

    fetchCharacters: async () => {
        if (get().isFetching) return;

        set({ isFetching: true });

        try {
            const currentPage = get().page;
            const data = await getData(currentPage);

            if (data && data.results) {
                set((state) => ({
                    characters: [...state.characters, ...data.results],
                    page: state.page + 1
                }));
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            alert("Ошибка при загрузке данных:")
        } finally {
            set({ isFetching: false });
        }
    }
}));
