<script setup lang="ts">
import { useCharactersStore } from "@/stores/charactersStore";
import { onMounted, ref, watch } from "vue";

const charactersStore = useCharactersStore();
const page = ref(1);
const isSort = ref<boolean>(false);
const visibleNext = ref<string>("visible");
const visiblePrev = ref<string>("visible");
const er = ref<string | null>(null);

const fetchCharacters = () => {
  charactersStore.getCharacters(page.value);
};

onMounted(() => {
  fetchCharacters();
});

const changePage = (increment: number) => {
  const newPage = page.value + increment;
  if (
    newPage > 0 &&
    (increment < 0 || charactersStore.characters?.info?.next !== null)
  ) {
    page.value = newPage;
    fetchCharacters();
  }
};

const sortCharacters = () => {
  isSort.value = true;
  if (page.value > 1) {
    page.value = 1;
  }
  fetchCharacters();
};

watch(
  () => ({
    next: charactersStore.characters?.info?.next,
    prev: page.value,
    error: charactersStore.error,
  }),
  ({ next, prev, error }) => {
    visiblePrev.value = prev === 1 ? "hidden" : "visible";
    visibleNext.value = next === null ? "hidden" : "visible";
    er.value = error;
  }
);
</script>

<template>
  <section>
    <h2 class="flex items-center justify-center h-96 font-bold text-7xl">
      Rick and Morty characters
    </h2>

    <div class="bg-colors-backgroundRoot">
      <div class="flex gap-10 pt-20 justify-center">
        <input
          type="text"
          placeholder="Name"
          class="rounded-md p-1 bg-colors-backgroundDescrip placeholder-colors-colorLabel text-white"
          v-model="charactersStore.nameCharacter"
        />
        <select
          v-model="charactersStore.statusCharacter"
          name="Select a status "
          class="rounded-md p-1 border-none bg-colors-backgroundDescrip text-white"
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead" selected>Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <button
          class="sortBtn rounded-md bg-colors-backgroundDescrip px-10 text-white cursor-pointer"
          @click="sortCharacters"
        >
          Sort
        </button>
      </div>
      <div v-if="er" class="text-red-500 text-center p-10">
        {{ er }}
      </div>

      <div v-else>
        <div
          class="grid-container grid grid-cols-2 gap-20 px-10 pt-20 pb-10 text-white"
        >
          <div
            v-for="results in charactersStore.characters?.results.slice(0, 6)"
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
                <span class="text-colors-colorLabel">
                  Last known location:
                </span>
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
        <div class="text-white flex justify-center gap-10 w-full p-8">
          <button
            @click="() => changePage(-1)"
            :class="{ btns: visiblePrev === 'hidden' }"
          >
            < Prev page
          </button>
          <button
            @click="() => changePage(1)"
            :class="{ btns: visibleNext === 'hidden' }"
          >
            Next page >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sortBtn:hover {
  background: rgba(158, 158, 158, 0.4);
}

.btns {
  visibility: hidden;
}

@media screen and (min-width: 1800px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
