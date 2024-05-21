import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { ICharactersRes } from "@/types/characters.types";

export const useCharactersStore = defineStore("characters", () => {
  const characters = ref<ICharactersRes | null>(null);

  const getCharacters = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_MAIN_URL}/character`
      );
      characters.value = data;
    } catch (error) {
      console.log("Что-то пошло не так...", error);
    }
  };
  

  return { characters, getCharacters };
});
