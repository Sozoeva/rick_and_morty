import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { ICharactersRes } from "@/types/characters.types";

export const useCharactersStore = defineStore("characters", () => {
  const characters = ref<ICharactersRes | null>(null);
  const error = ref<string | null>(null);
  const nameCharacter = ref<string>("");
  const statusCharacter = ref<string>("");

  const getCharacters = async (page: number) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_MAIN_URL}/character`, {
          params: {
            page,
            name: nameCharacter.value,
            status: statusCharacter.value
          }
        }
      );
      characters.value = data;
      error.value = null;
    } catch (err) {
      error.value = 'Write the name of an existing character! There is no such character.';
      characters.value = null;
    }
  };

  return { characters, getCharacters, error, nameCharacter, statusCharacter };
});
