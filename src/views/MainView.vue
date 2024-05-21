<script setup lang="ts">
import { useCharactersStore } from "@/stores/characters";
import { onMounted } from "vue";

const charactersStore = useCharactersStore();

onMounted(() => {
  charactersStore.getCharacters();
});
</script>

<template>
    <section>
      <h2 class="flex items-center justify-center h-96 font-bold text-7xl">
        Rick and Morty characters
      </h2>
      <div class="bg-colors-backgroundRoot">
        <div class="grid grid-cols-2 gap-20 p-40 text-white">
          <div
            v-for="results in charactersStore.characters?.results"
            class="character flex m-0 w-full h-60"
          >
            <img
              :src="results.image"
              alt="Character image"
              class="rounded-l-2xl"
            />
            <div
              class="bg-colors-backgroundDescrip w-full rounded-r-2xl flex flex-col justify-between px-5 py-10 text-sm"
            >
              <p class="text-xl">
                {{ results.name }}
              </p>
              <div class="flex items-center gap-2">
                <button
                  class="rounded-full p-1 border-none"
                  :style="{
                    backgroundColor:
                      results.status === 'Alive'
                        ? 'green'
                        : results.status === 'Dead'
                        ? 'red'
                        : 'gray',
                  }"
                ></button>
                <p>{{ results.status }} - {{ results.species }}</p>
              </div>
  
              <div class="flex flex-col">
                <span class="text-colors-colorLabel"> Last known location: </span>
                <p>{{ results.location.name }}</p>
              </div>
              <div class="flex flex-col">
                <span class="text-colors-colorLabel"> First seen in: </span>
                <p>
                  {{ results.origin.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped>

</style>
