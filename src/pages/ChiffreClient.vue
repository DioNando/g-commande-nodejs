<template>
  <q-page padding class="column">
    <ChartClient />
    <q-table
      title="Chiffre d'affaire des clients"
      :rows="rows"
      :columns="columns"
      row-key="numClient"
      flat
      color="accent"
      separator="none"
      bordered
      v-model:selected="selected"
      hide-selected-banner
      v-model:pagination="pagination"
      :rows-per-page-options="[4, 8, 12, 24, 0]"
      :rows-per-page-label="pagination.label"
      class="col"
    >
      <template v-slot:top-right>
        <q-input borderless debounce="300" label="Recherche" v-model="filter">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:no-data="{ icon, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Aucun client n'a été trouvé </span>
          <q-icon size="2em" :name="filter ? 'warning' : icon" />
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { getChiffreAffaires } from "src/api/client";
import ChartClient from "src/components/ChartClient.vue";

export default defineComponent({
  name: "ChiffreClient",
  components: {
    ChartClient,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        label: "Nombre de client par page",
      },
    };
  },
  setup() {
    const columns = [
      {
        name: "numClient",
        required: true,
        label: "ID",
        align: "left",
        field: (row) => row.numClient,
        sortable: true,
      },
      {
        name: "nomClient",
        label: "Nom",
        field: "nomClient",
        align: "left",
        sortable: true,
      },
      {
        name: "total",
        label: "Total (Ar)",
        field: "total",
        align: "right",
        sortable: true,
      },
    ];

    const rows = ref([]);

    getChiffreAffaires()
      .then((result) => {
        rows.value = result.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      selected: ref([]),
      filter: ref(""),
      columns,
      rows,
    };
  },
});
</script>
