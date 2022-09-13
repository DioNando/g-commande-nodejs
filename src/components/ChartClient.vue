<template>
  <div class="text-h4">Chiffre d'affaires par client</div>
  <div class="full-width row wrap justify-evenly items-start content-start">
    <apexchart
      ref="myChart"
      width="550"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <apexchart
      width="550"
      type="area"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { getChiffreAffaires } from "src/api/client";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  setup() {
    getChiffreAffaires()
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return {};
  },
};
</script>
