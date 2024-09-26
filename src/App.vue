<template>
  <div class="flex w-full h-full">
    <!-- Sidebar -->
    <div class="hidden md:block relative w-[30%] bg-gray-800 text-white p-6">
      <div class="fixed flex flex-col gap-6 w-[20%]">
        <div
          class="bg-gray-300 text-gray-800 text-center p-4 rounded-lg text-xl font-bold mb-6"
        >
          Logo
        </div>
        <nav>
          <ul class="space-y-4">
            <li
              @click="
                selectContinent('Asia');
                currentView = 'home';
                clearContinentFilter();
              "
              :class="{
                'bg-white text-gray-800 font-bold p-3 rounded-lg': currentView === 'home',
                'text-white': currentView !== 'home',
              }"
              class="cursor-pointer hover:bg-gray-700 hover:text-white p-3 rounded-lg"
            >
              Home
            </li>
            <li
              @click="currentView = 'vista1'"
              :class="{
                'bg-white text-gray-800 font-bold p-3 rounded-lg':
                  currentView === 'vista1',
                'text-white': currentView !== 'vista1',
              }"
              class="cursor-pointer hover:bg-gray-700 hover:text-white p-3 rounded-lg"
            >
              Vista 1
            </li>
            <li
              @click="currentView = 'vista2'"
              :class="{
                'bg-white text-gray-800 font-bold p-3 rounded-lg':
                  currentView === 'vista2',
                'text-white': currentView !== 'vista2',
              }"
              class="cursor-pointer hover:bg-gray-700 hover:text-white p-3 rounded-lg"
            >
              Vista 2
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Slidebar Mobile -->
    <div
      v-if="showSlidebarMenu"
      class="fixed h-full opacity-80 z-50 w-[40%] bg-gray-800 text-white p-6"
    >
      <div class="relative">
        <div
          @click="showSlidebar"
          class="absolute text-red-600 font-bold text-2xl left-[90%] cursor-pointer"
        >
          X
        </div>
        <div class="text-xl font-bold mb-6">Logo</div>
        <nav>
          <ul class="space-y-4">
            <li
              @click="
                clearContinentFilter;
                currentView = 'home';
              "
              :class="{ 'text-gray-300': currentView === 'home' }"
              class="cursor-pointer hover:text-gray-300"
            >
              Home
            </li>
            <li
              @click="currentView = 'vista1'"
              :class="{ 'text-gray-300': currentView === 'vista1' }"
              class="cursor-pointer hover:text-gray-300"
            >
              Vista 1
            </li>
            <li
              @click="currentView = 'vista2'"
              :class="{ 'text-gray-300': currentView === 'vista2' }"
              class="cursor-pointer hover:text-gray-300"
            >
              Vista 2
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full md:w-4/5 h-screen overflow-y-auto p-6 bg-blue-50">
      <div v-if="currentView === 'home'">
        <!-- Search bar -->
        <div class="relative h-20 flex flex-col items-center mb-6">
          <div class="fixed flex gap-2 justify-center w-full md:w-[70%]">
            <div
              @click="showSlidebar"
              v-if="showSlidebarMenu === false"
              class="md:hidden flex items-center cursor-pointer shadow-2xl hover:bg-gray-200 p-2 rounded-[50%]"
            >
              <span class="material-symbols-outlined text-gray-800"> menu </span>
            </div>
            <div class="flex w-[85%] relative">
              <!-- Contenedor del input que ocupa el 100% -->
              <label class="absolute z-10 left-4 top-1">Pais</label>
              <input
                type="text"
                v-model="searchText"
                @click="toggleContinentFilter"
                placeholder="Escribe el país que deseas ver"
                class="text-xs px-4 pt-6 pb-2 border drop-shadow-xl border-gray-300 rounded-lg w-full"
              />

              <button
                @click="searchCountry"
                class="absolute right-2 top-[5px] flex gap-2 p-2 w-28 bg-blue-500 text-white rounded-[20px] hover:bg-blue-600"
              >
                <span class="material-symbols-outlined flex flex-col items-center">
                  search
                </span>
                Buscar
              </button>
            </div>
          </div>

          <div
            v-if="showContinentFilter"
            class="w-[97%] md:w-[45%] left-[2%] md:left-[33.5%] fixed mt-2 top-[75px] bg-white rounded-[20px] shadow-lg p-4 z-30"
          >
            <div class="flex justify-between items-center gap-4">
              <h3>Filtrar por continente</h3>
              <button @click="clearContinentFilter" class="text-blue-500">Limpiar</button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div
                @click="selectContinent('Europe')"
                class="cursor-pointer border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
              >
                <img
                  :src="
                    countries.find((c) => c.continent.name === 'Europe')
                      ?.continentImage || 'default-image-url.jpg'
                  "
                  alt="Europa"
                  class="w-full h-20 object-cover"
                />
                <p class="text-center mt-2">Europa</p>
              </div>
              <div
                @click="selectContinent('North America')"
                class="cursor-pointer border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
              >
                <img
                  :src="
                    countries.find((c) => c.continent.name === 'North America')
                      ?.continentImage || 'default-image-url.jpg'
                  "
                  alt="Europa"
                  class="w-full h-20 object-cover"
                />
                <p class="text-center mt-2">Norte América</p>
              </div>
              <div
                @click="selectContinent('South America')"
                class="cursor-pointer border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
              >
                <img
                  :src="
                    countries.find((c) => c.continent.name === 'South America')
                      ?.continentImage || 'default-image-url.jpg'
                  "
                  alt="Europa"
                  class="w-full h-20 object-cover"
                />
                <p class="text-center mt-2">Sudamerica</p>
              </div>
              <div
                @click="selectContinent('Asia')"
                class="cursor-pointer border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
              >
                <img
                  :src="
                    countries.find((c) => c.continent.name === 'Asia')?.continentImage ||
                    'default-image-url.jpg'
                  "
                  alt="Europa"
                  class="w-full h-20 object-cover"
                />
                <p class="text-center mt-2">Asia</p>
              </div>
              <div
                @click="selectContinent('Oceania')"
                class="cursor-pointer border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
              >
                <img
                  :src="
                    countries.find((c) => c.continent.name === 'Oceania')
                      ?.continentImage || 'default-image-url.jpg'
                  "
                  alt="Europa"
                  class="w-full h-20 object-cover"
                />
                <p class="text-center mt-2">Oceanía</p>
              </div>
              <div
                @click="selectContinent('Africa')"
                class="cursor-pointer border border-gray-300 rounded-lg p-2 hover:bg-gray-200"
              >
                <img
                  :src="
                    countries.find((c) => c.continent.name === 'Africa')
                      ?.continentImage || 'default-image-url.jpg'
                  "
                  alt="Europa"
                  class="w-full h-20 object-cover"
                />
                <p class="text-center mt-2">África</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid de países -->
        <div
          :class="
            showModal
              ? 'grid-cols-2 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          "
          class="grid gap-6"
        >
          <div
            v-for="country in filteredCountries"
            :key="country.name"
            @click="selectCountry(country)"
            :class="{
              'bg-blue-400': selectedCountry && selectedCountry.name === country.name,
              'bg-white': !selectedCountry || selectedCountry.name !== country.name,
            }"
            class="m-6 rounded-[30px] shadow-lg overflow-hidden cursor-pointer transition-all duration-300"
          >
            <img
              :src="country.image"
              :alt="country.name"
              class="w-full h-40 object-cover"
            />
            <div class="flex p-4 text-center gap-2">
              <div class="flex items-center">
                <img
                  :src="getFlagUrl(country.code)"
                  :alt="`Bandera de ${country.name}`"
                  class="w-10 h-10 object-cover"
                />
              </div>
              <div>
                <h3
                  class="text-lg font-bold"
                  :class="{
                    'text-white':
                      selectedCountry && selectedCountry.name === country.name,
                    'text-black':
                      !selectedCountry || selectedCountry.name !== country.name,
                  }"
                >
                  {{ country.name }}
                </h3>
                <p
                  class="text-gray-500"
                  :class="{
                    'text-white':
                      selectedCountry && selectedCountry.name === country.name,
                    'text-black':
                      !selectedCountry || selectedCountry.name !== country.name,
                  }"
                >
                  {{ country.continent.name }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal detalles pais -->
        <div
          v-if="showModal"
          class="fixed bottom-0 right-1 w-full md:w-[72.5%] lg:w-[23%] h-screen lg:h-[86%] lg:bg-white shadow-lg z-50"
        >
          <!-- Fondo oscuro con opacity-90 -->
          <div
            class="fixed inset-0 bg-black opacity-90 z-40 lg:hidden"
            @click="showModal = false"
          ></div>
          <!-- Modal centrado en pantallas pequeñas, movido hacia la derecha en pantallas grandes -->
          <div
            class="fixed lg:relative inset-0 lg:inset-auto flex items-center lg:items-start justify-center z-50"
          >
            <div
              class="bg-white lg:bg-transparent z-[60] rounded-lg shadow-lg lg:shadow-none p-6 w-[80%] sm:w-[60%] md:w-[50%] flex items-center justify-center lg:w-[100%] lg:h-[80%] relative"
            >
              <button
                @click="showModal = false"
                class="absolute top-[-1%] md:top-[-7%] lg:top-[1%] right-[2%] md:right-[-12%] lg:right-[0%] m-2 font-bold text-gray-500 text-xl hover:text-red-600"
              >
                X
              </button>
              <div class="flex flex-col items-center lg:w-[200px]">
                <img
                  :src="selectedCountry.image"
                  :alt="selectedCountry.name"
                  class="my-4 w-[80%] md:w-[100%] h-40 object-cover rounded-[20px]"
                />
                <div>
                  <div class="flex gap-4 items-center justify-center">
                    <div class="mt-2 mb-4">
                      <img
                        :src="selectedCountry.flag"
                        :alt="`Bandera de ${selectedCountry.name}`"
                        class="w-10 h-10 object-cover"
                      />
                    </div>
                    <div>
                      <h2 class="text-xs text-blue-500 font-bold">
                        {{ selectedCountry.name }}
                      </h2>
                      <p class="text-xs text-gray-500">
                        {{ selectedCountry.continent.name }}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-500">
                      <label class="text-blue-400 font-bold">Capital: </label>
                      {{ selectedCountry.capital }}
                    </p>
                    <p class="text-gray-500">
                      <label class="text-blue-400 font-bold">Language: </label>
                      {{ selectedCountry.language.name }}
                    </p>
                    <p class="text-gray-500">
                      <label class="text-blue-400 font-bold">Population</label>
                      Population: {{ selectedCountry.population }} people
                    </p>
                    <p class="text-gray-500">
                      <label class="text-blue-400 font-bold">Currency: </label
                      >{{ selectedCountry.currency }}
                    </p>
                  </div>

                  <!-- Textarea para las subdivisiones -->
                  <div class="mt-4">
                    <label for="subdivisions" class="block text-blue-400 font-bold mb-2"
                      >Region</label
                    >
                    <textarea
                      id="subdivisions"
                      class="w-full p-2 border border-gray-300 rounded-lg resize-none"
                      rows="4"
                      readonly
                      >{{ selectedCountry.subdivisions.join(", ") }}</textarea
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista 1 -->
      <div v-if="currentView === 'vista1'" class="h-screen">
        <div
          @click="showSlidebar"
          v-if="showSlidebarMenu === false"
          class="md:hidden flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-[50%]"
        >
          <span class="material-symbols-outlined text-gray-800"> menu </span>
        </div>
        <h1 class="text-2xl font-bold">¡Hola! Esta es la Vista 1</h1>
        <p>Contenido de la Vista 1.</p>
      </div>

      <!-- Vista 2 -->
      <div v-if="currentView === 'vista2'" class="h-screen">
        <div
          @click="showSlidebar"
          v-if="showSlidebarMenu === false"
          class="md:hidden flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-[50%]"
        >
          <span class="material-symbols-outlined text-gray-800"> menu </span>
        </div>
        <h1 class="text-2xl font-bold">¡Hola! Esta es la Vista 2</h1>
        <p>Contenido de la Vista 2.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { request, gql } from "graphql-request";
import axios from "axios";

export default {
  data() {
    return {
      currentView: "home",
      searchText: "",
      selectedContinent: "",
      showContinentFilter: false,
      showSlidebarMenu: false,
      showModal: false,
      selectCountry2: null, // País seleccionado
      selectedCountry: {}, // Aquí almacenarás el país seleccionado
      // Otras propiedades
      countries: [], // Datos de los países obtenidos con GraphQL
      unsplashAccessKey: "thqAkytFXKp8BgACJTEE-hK8Ye5i4tYbOWwlBKzslu4", // Reemplaza con tu Access Key de Unsplash
    };
  },
  computed: {
    filteredCountries() {
      console.log("Estoy en una propiedad computada");

      return this.countries.filter((country) => {
        const matchesContinent =
          this.selectedContinent === "" ||
          country.continent.name === this.selectedContinent;
        const matchesName =
          this.searchText === "" ||
          country.name.toLowerCase().includes(this.searchText.toLowerCase());

        return matchesContinent && matchesName;
      });
    },
  },
  methods: {
    selectCountry(country) {
      this.selectCountry2 = country; // Asignar país seleccionado
      this.openModal(country); // Abrir modal
    },
    openModal(country) {
      this.selectedCountry = country;
      console.log("Estoy en openModal", this.selectedCountry);
      this.showModal = true;
    },
    searchCountry() {
      console.log("Estoy en searchCountry");
    },
    toggleContinentFilter() {
      this.showContinentFilter = !this.showContinentFilter;
    },
    selectContinent(continent) {
      this.selectedContinent = continent;
      this.showContinentFilter = false;
    },
    clearContinentFilter() {
      this.selectedContinent = "";
      this.showContinentFilter = false;
      console.log("estoy en clearContinentFilter");
    },

    // ocultar y mostrar slidebar
    showSlidebar() {
      this.showSlidebarMenu = !this.showSlidebarMenu;
      console.log("mostrarSlidebar", countries.capital);
    },
    async fetchCountries() {
      const query = gql`
        query {
          countries {
            code
            name
            continent {
              name
            }
            emoji
            capital
            currency
            languages {
              name
            }
            subdivisions {
              name
            }
          }
        }
      `;

      try {
        const data = await request("https://countries.trevorblades.com/", query);
        console.log(data);

        this.countries = await Promise.all(
          data.countries.map(async (country) => {
            console.log("Estoy en data");

            const image = await this.fetchCountryImage(country.name);
            const continentImage = await this.fetchCountryImage(country.continent.name);
            // Consulta REST API para obtener la población
            const restResponse = await fetch(
              `https://restcountries.com/v3.1/alpha/${country.code}`
            );
            const restData = await restResponse.json();
            const population = restData[0].population;

            //obtener la bandera
            const flag = this.getFlagUrl(country.code);

            return {
              name: country.name, // Nombre del país
              continent: country.continent, // Continente del país
              image: image, // Imagen del país obtenida desde Unsplash
              //Imagen del continente obtenida desde Unsplash
              continentImage: continentImage, // Imagen del continente obtenida desde Unsplash
              //agregar capital, moneda y lenguaje
              capital: country.capital,
              currency: country.currency,
              language: country.languages[0],
              population: population,
              code: country.code, // Código ISO del país
              flag: flag, // Bandera del país
              subdivisions: country.subdivisions.map((subdivision) => subdivision.name), // Subdivisiones del país
            };
          })
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
    getFlagUrl(countryCode) {
      return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`; // URL de la bandera basada en el código ISO
    },
    async fetchCountryImage(countryName) {
      const unsplashURL = `https://api.unsplash.com/search/photos?query=${countryName}&client_id=${this.unsplashAccessKey}`;

      try {
        const response = await axios.get(unsplashURL);
        const images = response.data.results;
        if (images.length > 0) {
          return images[0].urls.small; // Obtén la primera imagen del resultado
        } else {
          return "default-image-url.jpg"; // URL de imagen predeterminada si no se encuentra ninguna
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        return "default-image-url.jpg"; // Imagen predeterminada en caso de error
      }
    },
  },
  mounted() {
    this.fetchCountries(); // Llamar al método cuando el componente se monta
  },
};
</script>

<style scoped>
/* No additional styles needed since we're using Tailwind */
</style>
