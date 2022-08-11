<template>
  <q-page
    padding
    class="full-width no-wrap row justify-start items-start content-start"
  >
    <q-table
      title="Liste des produits"
      :rows="rows"
      :columns="columns"
      row-key="idProduit"
      flat
      color="accent"
      :filter="filter"
      separator="none"
      bordered
      selection="single"
      v-model:selected="selected"
      class="col q-mr-md"
      hide-selected-banner
    >
      <template v-slot:top-right>
        <q-input
          borderless
          debounce="300"
          label="Recherche d'un produit"
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
          <span> Aucun produit n'a été trouvé </span>
          <q-icon size="2em" :name="filter ? 'warning' : icon" />
        </div>
      </template>
    </q-table>

    <div class="q-pa-lg bg-dark shadow-6 q-ml-md" style="width: 25rem">
      <!-- <q-form @submit.prevent="onSubmit" @reset="onReset"> -->
      <q-form>
        <div v-if="selected.length" class="text-h5">
          Informations sur le produit
        </div>
        <div v-else class="text-h5">Aucun produit selectionné</div>
        <q-input
          label="Identification du produit"
          readonly
          borderless
          v-model="produit.id"
        />

        <q-input
          label="Designation"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Veuillez saisir un produit valide',
          ]"
          v-model="produit.designation"
        />
        <q-input
          label="Prix Unitaire"
          type="number"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Le prix doit être superieur à zero',
          ]"
          v-model="produit.prixUni"
        />
        <q-input
          label="Stock"
          type="number"
          lazy-rules
          v-model="produit.stock"
        />
        <div
          v-if="selected.length"
          class="fit row no-wrap justify-between items-center content-start q-mt-lg"
        >
          <div>
            <q-btn
              label="Modifier"
              icon="cloud_upload"
              type="submit"
              color="positive"
            />
          </div>
          <div>
            <q-btn round color="negative" type="submit" icon="delete" />
          </div>
        </div>
      </q-form>
      <div class="q-mt-md" v-if="selected.length">Produit : {{ selected }}</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

const columns = [
  {
    name: "idProduit",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.idProduit,
    sortable: true,
  },
  {
    name: "designProduit",
    label: "Designation Produit",
    field: "designProduit",
    align: "left",
    sortable: true,
  },
  {
    name: "prixUniProduit",
    label: "Prix Unitaire",
    field: "prixUniProduit",
    align: "right",
    sortable: true,
  },
  {
    name: "stockProduit",
    label: "Stock",
    field: "stockProduit",
    align: "right",
  },
];

const rows = [
  {
    idProduit: 159,
    designProduit: "Frozen Yogurt",
    prixUniProduit: 355,
    stockProduit: 456,
  },
  {
    idProduit: 237,
    designProduit: "Ice cream sandwich",
    prixUniProduit: 4554,
    stockProduit: 542,
  },
  {
    idProduit: 262,
    designProduit: "Eclair",
    prixUniProduit: 6464,
    stockProduit: 8787,
  },
  {
    idProduit: 305,
    designProduit: "Cupcake",
    prixUniProduit: 54,
    stockProduit: 4657,
  },
  {
    idProduit: 356,
    designProduit: "Gingerbread",
    prixUniProduit: 243,
    stockProduit: 344,
  },
  {
    idProduit: 375,
    designProduit: "Jelly bean",
    prixUniProduit: 4576,
    stockProduit: 465,
  },
  {
    idProduit: 392,
    designProduit: "Lollipop",
    prixUniProduit: 4654,
    stockProduit: 8709,
  },
  {
    idProduit: 408,
    designProduit: "Honeycomb",
    prixUniProduit: 757,
    stockProduit: 668,
  },
  {
    idProduit: 452,
    designProduit: "Donut",
    prixUniProduit: 6886,
    stockProduit: 45,
  },
];

export default defineComponent({
  name: "PageProduit",
  data() {
    return {
      produit: {
        id: "",
        designation: "",
        prixUni: "",
        stock: "",
      },
    };
  },
  setup() {
    return {
      selected: ref([]),
      filter: ref(""),
      columns,
      rows,
    };
  },
});
</script>
