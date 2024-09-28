<!-- MainComponent.vue -->
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { phoneInfo } from "./../lib/cv";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const data = ref({
  Consolidado: {
    Tiktok: 16693.1,
    Instagram: 8229,
    Whatsapp: 15298,
    Twitter: 742.85,
    Navegador: 4289.866,
    Youtube: 4679,
    Spotify: 4143,
    Streaming: 1183,
    Facebook: 1723.4,
    Juegos: 4352,
  },
});

const colors = {
  Tiktok: "#333333", // Dark gray for TikTok
  Instagram: "#FF00FF", // Magenta for Instagram
  Whatsapp: "#3C873A", // Olive green for WhatsApp
  Twitter: "#69B3F5", // Lighter blue for Twitter
  Navegador: "#FF9900", // Generic browser color (orange)
  Youtube: "#FF0000", // YouTube's red
  Spotify: "#1ED760", // Brighter lime green for Spotify
  Streaming: "#9B59B6", // Purple for general streaming
  Facebook: "#0D47A1", // Darker blue for Facebook
  Juegos: "#F1C40F", // Yellow for games
};

// List of all application names
const applications = Object.keys(data.value.Consolidado);

// Generate chart data
const chartData = computed(() => {
  const labels = Object.keys(data.value).filter((day) => day !== "Consolidado");

  const datasets = applications.map((app) => {
    return {
      label: app,
      backgroundColor: colors[app],
      data: labels.map((day) => data.value[day][app]),
    };
  });

  return {
    labels,
    datasets,
  };
});

// Chart options
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "App Usage by Day",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 18,
    },
  },
});

// Import the TheSpinner component
import TheSpinner from "@/components/TheSpinner.vue";

const cv = ref([]);
const loading = ref(true);

function calculateTotals(dataset) {
  return dataset.reduce((totals, entry) => {
    if (!entry.Nombre || !entry.Dia) return totals;

    if (!totals[entry.Dia]) {
      totals[entry.Dia] = {
        Tiktok: 0,
        Instagram: 0,
        Whatsapp: 0,
        Twitter: 0,
        Navegador: 0,
        Youtube: 0,
        Spotify: 0,
        Streaming: 0,
        Facebook: 0,
        Juegos: 0,
      };
    }

    for (const app in totals[entry.Dia]) {
      totals[entry.Dia][app] += Number(entry[app] || 0) / 60;
    }

    return totals;
  }, {});
}

const names = ref([]);

onBeforeMount(() => {
  phoneInfo.then((res) => {
    names.value = [...new Set(res.map((item) => item.Nombre))].sort();
    data.value = calculateTotals(
      res.filter((item) => item.Nombre === names.value[0])
    );
    loading.value = false;
  });
});

function filterByName(name) {
  loading.value = true;
  phoneInfo.then((res) => {
    const filtered = res.filter((item) => item.Nombre === name);
    data.value = calculateTotals(filtered);
    loading.value = false;
  });
}
</script>

<template>
  <TheSpinner :loading="loading" />
  <section class="container" :class="`${loading ? 'hide' : 'show'}`">
    <div class="wrapper">
      <div class="filters">
        <div v-for="name in names" :key="name">
          <p @click="filterByName(name)">{{ name }}</p>
        </div>
      </div>
      <div class="data">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  transition: all 0.5s;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  p {
    margin: 0px;
    font-size: 0.8rem;
    text-transform: lowercase;
    border: 1px solid gray;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
  }

  p:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
}

.show {
  opacity: 1;
}

.hide {
  opacity: 0;
}
</style>
