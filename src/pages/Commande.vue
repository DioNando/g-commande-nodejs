<template>
  <q-page padding class="full-width column">
    <div v-if="selected.length" class="q-pa-lg bg-dark shadow-6 rounded-borders">
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
            v-model="commande.numCommande"
            class="col q-mr-md"
          />

          <q-input
            label="Date"
            type="date"
            v-model="commande.dateCommande"
            class="col q-ml-md"
          />
        </div>
        <div
          class="full-width no-wrap row justify-between items-start content-start"
        >
          <q-input
            label="ID Client"
            type="text"
            v-model="commande.numClient"
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
            v-model="commande.numProduit"
            class="col q-mr-md"
            borderless
          />
          <q-input
            label="Designation Produit"
            type="text"
            v-model="commande.designProduit"
            class="col q-mx-md"
          />
          <q-input
            label="Quantité"
            type="number"
            v-model="commande.qte"
            class="col q-ml-md"
          />
        </div>
        <q-input
          label="Prix Unitaire"
          suffix="Ar"
          type="text"
          v-model="commande.puProduit"
          readonly
          borderless
        />

        <div
          class="fit row no-wrap justify-between items-baseline content-start q-mt-lg"
        >
          <div class="text-h5 shadow-5 q-pa-sm rounded-borders">
            Total : {{ commande.total }} Ar
          </div>
          <!-- <div class="row no-wrap">
            <div>
              <q-btn
                label="Facture"
                icon="file_download"
                type="submit"
                color="primary"
              />
            </div>
            <div>
              <q-btn
                :loading="loading[1]"
                icon="cloud_upload"
                type="submit"
                color="positive"
                label="Modifier"
                class="q-ml-md"
              >
                <template v-slot:loading>
                  <q-spinner-dots class="on-left" />
                  MODIFIER
                </template>
              </q-btn>
            </div>
          </div> -->
          <div>
            <q-btn round color="negative" icon="delete" @click="onDelete" />
          </div>
        </div>
      </q-form>
    </div>
    <div v-else class="text-h5 q-pa-lg bg-dark shadow-6 rounded-borders">
      Aucune commande selectionnée
    </div>

    <q-table
      title="Liste des commandes"
      :rows="rows"
      :columns="columns"
      row-key="numCommande"
      flat
      color="accent"
      :filter="filter"
      separator="none"
      bordered
      selection="single"
      v-model:selected="selected"
      class="q-mt-lg"
      hide-selected-banner
      @selection="onRowClick"
      v-model:pagination="pagination"
      :rows-per-page-options="[4, 8, 12, 24, 0]"
      :rows-per-page-label="pagination.label"
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
import { useQuasar } from "quasar";
import {
  getAllCommandes,
  updateCommande,
  deleteCommande,
} from "src/api/commande";

export default defineComponent({
  name: "PageProduit",
  data() {
    return {
      pagination: {
        rowsPerPage: 7,
        label: "Nombre de commande par page",
      },
      commande: {
        numCommande: "",
        dateCommande: "",
        numClient: "",
        nomClient: "",
        numProduit: "",
        designProduit: "",
        puProduit: "",
        qte: "",
        total: "",
      },
    };
  },
  setup() {
    const loading = ref([false]);

    const progress = ref(false);
    let timer = null;

    function simulateProgress(number) {
      loading.value[number] = true;
      setTimeout(() => {
        loading.value[number] = false;
      }, 1500);
    }

    const toast = useQuasar();

    const columns = [
      {
        name: "numCommande",
        required: true,
        label: "ID",
        align: "left",
        field: (row) => row.numCommande,
        sortable: true,
      },
      {
        name: "dateCommande",
        label: "Date",
        field: "dateCommande",
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
        name: "qte",
        label: "Quantité",
        field: "qte",
        align: "right",
      },
    ];

    const rows = ref([]);

    getAllCommandes()
      .then((result) => {
        rows.value = result.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      toast,
      selected: ref([]),
      filter: ref(""),
      columns,
      rows,
      progress,
      simulateProgress,
      loading,
      timer,
    };
  },
  methods: {
    onRowClick(row) {
      this.selected = [];
      this.selected.push(row);
      const obj = JSON.parse(JSON.stringify(this.selected[0].rows[0]));
      this.commande.numCommande = obj.numCommande;
      this.commande.dateCommande = obj.dateCommande;
      this.commande.numClient = obj.numClient;
      this.commande.nomClient = obj.nomClient;
      this.commande.numProduit = obj.numProduit;
      this.commande.designProduit = obj.designProduit;
      this.commande.puProduit = obj.puProduit;
      this.commande.qte = obj.qte;
      this.commande.total = obj.total;
    },
    onDelete() {
      this.toast
        .dialog({
          dark: true,
          title: "Confirmer la suppression",
          message:
            "Voulez-vous supprimer cette commande ? " +
            this.commande.numCommande,
          cancel: true,
          ok: "Supprimer",
          cancel: "Annuler",
          persistent: true,
          transitionHide: "fade",
        })
        .onOk(() => {
          deleteCommande(
            this.commande.numCommande,
            this.commande.numProduit,
            this.commande.qte
          )
            .then(() => {
              this.editing = false;
              this.toast.notify({
                type: "warning",
                message: "Le commande a bien été supprimé",
                icon: "edit_note",
                position: "bottom-right",
              });
              // const index = this.rows
              //   .map((object) => object.numClient)
              //   .indexOf(this.client.numClient);
              // this.rows.splice(index, 1);
              getAllCommandes()
                .then((result) => {
                  this.rows = result.data;
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
              this.toast.notify({
                type: "negative",
                textColor: "White",
                icon: "warning",
                message: "Erreur lors de la suppression de la commande",
                position: "bottom-right",
              });
            });
        });
    },
  },
});
</script>
