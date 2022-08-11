<template>
  <q-page padding class="full-width column">
    <div v-if="selected.length" class="q-pa-lg bg-dark shadow-6">
      <!-- <q-form @submit.prevent="onSubmit" @reset="onReset"> -->
      <q-form>
        <div v-if="selected.length" class="text-h5">
          Informations sur la commande
        </div>
        <div v-else class="text-h5">Aucune commande selectionnée</div>
        <div
          class="full-width no-wrap row justify-between items-start content-start"
        >
          <q-input
            label="Identification de la commande"
            readonly
            borderless
            v-model="commande.id"
            class="col q-mr-md"
          />

          <q-input
            label="Date"
            type="date"
            v-model="commande.date"
            class="col q-ml-md"
          />
        </div>
        <div
          class="full-width no-wrap row justify-between items-start content-start"
        >
          <q-input
            label="ID Client"
            type="text"
            v-model="commande.idClient"
            class="col q-mr-md"
            borderless
          />
          <q-input
            label="Client"
            type="text"
            v-model="commande.nomClient"
            class="col q-ml-md"
          />
        </div>
        <div
          class="full-width no-wrap row justify-between items-start content-start"
        >
          <q-input
            label="ID Produit"
            type="text"
            v-model="commande.idProduit"
            class="col q-mr-md"
            borderless
          />
          <q-input
            label="Designation Produit"
            type="text"
            v-model="commande.designProduit"
            class="col q-mx-md"
          />
          <q-input label="Quantité" type="number" v-model="commande.quantite" class="col q-ml-md" />
        </div>
        <q-input
          label="Montant"
          type="text"
          v-model="commande.montant"
          readonly
          borderless
        />
        <div
          class="fit row no-wrap justify-between items-center content-start q-mt-lg"
        >
          <div class="row no-wrap">
            <div>
              <q-btn
                label="Facture"
                icon="file_download"
                type="submit"
                color="primary"
              />
            </div>
            <div class="q-ml-lg">
              <q-btn
                label="Modifier"
                icon="cloud_upload"
                type="submit"
                color="positive"
              />
            </div>
          </div>
          <div>
            <q-btn round color="negative" type="submit" icon="delete" />
          </div>
        </div>
      </q-form>
      <div class="q-mt-md">Commande : {{ selected }}</div>
    </div>
    <div v-else class="text-h5 q-pa-lg bg-dark shadow-6">
      Aucune commande selectionnée
    </div>

    <q-table
      title="Liste des commandes"
      :rows="rows"
      :columns="columns"
      row-key="idCommande"
      flat
      color="accent"
      :filter="filter"
      separator="none"
      bordered
      selection="single"
      v-model:selected="selected"
      hide-selected-banner
      class="q-mt-lg"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          debounce="300"
          label="Recherche d'une commande"
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
          <span> Aucune commande n'a été trouvé </span>
          <q-icon size="2em" :name="filter ? 'warning' : icon" />
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

const columns = [
  {
    name: "idCommande",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.idCommande,
    sortable: true,
  },
  {
    name: "date",
    label: "Date",
    field: "date",
    align: "right",
    sortable: true,
  },
  {
    name: "nomClient",
    label: "Client",
    field: "nomClient",
    align: "left",
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
    name: "quantite",
    label: "Quantité",
    field: "quantite",
    align: "right",
  },
  {
    name: "montant",
    label: "Montant",
    field: "montant",
    align: "right",
  },
];

const rows = [
  {
    idCommande: 159,
    date: "22/12/2022",
    idClient: 159,
    nomClient: "Nom et Prénom",
    idProduit: 159,
    designProduit: "Frozen Yogurt",
    quantite: 33,
    montant: 646,
  },
  {
    idCommande: 237,
    date: "22/12/2022",
    idClient: 237,
    nomClient: "Nom et Prénom",
    idProduit: 237,
    designProduit: "Ice cream sandwich",
    quantite: 1214,
    montant: 543,
  },
  {
    idCommande: 262,
    date: "22/12/2022",
    idClient: 262,
    nomClient: "Nom et Prénom",
    idProduit: 262,
    designProduit: "Eclair",
    quantite: 464,
    montant: 76,
  },
  {
    idCommande: 305,
    date: "22/12/2022",
    idClient: 305,
    nomClient: "Nom et Prénom",
    idProduit: 305,
    designProduit: "Cupcake",
    quantite: 7978,
    montant: 668,
  },
  {
    idCommande: 356,
    date: "22/12/2022",
    idClient: 356,
    nomClient: "Nom et Prénom",
    idProduit: 356,
    designProduit: "Gingerbread",
    quantite: 686,
    montant: 123,
  },
  {
    idCommande: 375,
    date: "22/12/2022",
    idClient: 375,
    nomClient: "Nom et Prénom",
    idProduit: 375,
    designProduit: "Jelly bean",
    quantite: 5858,
    montant: 68,
  },
  {
    idCommande: 392,
    date: "22/12/2022",
    idClient: 392,
    nomClient: "Nom et Prénom",
    idProduit: 392,
    designProduit: "Lollipop",
    quantite: 6886,
    montant: 6886,
  },
  {
    idCommande: 408,
    date: "22/12/2022",
    idClient: 408,
    nomClient: "Nom et Prénom",
    idProduit: 408,
    designProduit: "Honeycomb",
    quantite: 90,
    montant: 464,
  },
  {
    idCommande: 452,
    date: "22/12/2022",
    idClient: 452,
    nomClient: "Nom et Prénom",
    idProduit: 452,
    designProduit: "Donut",
    quantite: 786,
    montant: 688,
  },
];

export default defineComponent({
  name: "PageProduit",
  data() {
    return {
      commande: {
        id: "",
        date: "2022-08-13",
        idClient: "",
        nomClient: "",
        idProduit: "",
        designProduit: "",
        quantite: "",
        montant: "",
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
