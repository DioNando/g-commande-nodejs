<template>
  <q-page
    padding
    class="full-width no-wrap row justify-start items-start content-start"
  >
    <q-table
      title="Chiffre d'affaire des clients"
      :rows="rows"
      :columns="columns"
      row-key="idClient"
      flat
      color="accent"
      separator="none"
      bordered
      v-model:selected="selected"
      class="col q-mr-md"
      hide-selected-banner
      v-model:pagination="pagination"
      :rows-per-page-options="[4, 8, 12, 24, 0]"
      :rows-per-page-label="pagination.label"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          debounce="300"
          label="Recherche"
          v-model="filter"
        >
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

const rows = [
  {
    idClient: 159,
    nomClient: "Frozen Yogurt",
  },
  {
    idClient: 237,
    nomClient: "Ice cream sandwich",
  },
  {
    idClient: 262,
    nomClient: "Eclair",
  },
  {
    idClient: 305,
    nomClient: "Cupcake",
  },
  {
    idClient: 356,
    nomClient: "Gingerbread",
  },
  {
    idClient: 375,
    nomClient: "Jelly bean",
  },
  {
    idClient: 392,
    nomClient: "Lollipop",
  },
  {
    idClient: 408,
    nomClient: "Honeycomb",
  },
  {
    idClient: 452,
    nomClient: "Donut",
  },
  {
    idClient: 408,
    nomClient: "Honeycomb",
  },
  {
    idClient: 452,
    nomClient: "Donut",
  },
  {
    idClient: 408,
    nomClient: "Honeycomb",
  },
  {
    idClient: 452,
    nomClient: "Donut",
  },
];

export default defineComponent({
  name: "ChiffreClient",
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
        name: "idClient",
        required: true,
        label: "ID",
        align: "left",
        field: (row) => row.idClient,
        sortable: true,
      },
      {
        name: "nomClient",
        label: "Nom",
        field: "nomClient",
        align: "left",
        sortable: true,
      },
    ];

    // const rows = ref([]);

    // getAllProduits()
    //   .then((result) => {
    //     rows.value = result.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    return {
      selected: ref([]),
      filter: ref(""),
      columns,
      rows,
    };
  },
});
</script>
