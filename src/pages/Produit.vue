<template>
  <q-page
    padding
    class="full-width no-wrap row justify-start items-start content-start"
  >
    <q-table
      title="Liste des produits"
      :rows="rows"
      :columns="columns"
      row-key="numProduit"
      flat
      color="accent"
      :filter="filter"
      separator="none"
      bordered
      selection="single"
      v-model:selected="selected"
      class="col q-mr-md"
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
      <q-form @submit.prevent="onSubmit">
        <div v-if="selected.length" class="text-h5">
          Informations sur le produit
        </div>
        <div v-else class="text-h5">Aucun produit selectionné</div>
        <q-input
          label="Identification du produit"
          readonly
          borderless
          v-model="produit.numProduit"
        />

        <q-input
          label="Designation"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Veuillez saisir un produit valide',
          ]"
          v-model="produit.designProduit"
        />
        <q-input
          label="Prix Unitaire"
          type="number"
          lazy-rules
          v-model="produit.puProduit"
        />
        <q-input
          label="Stock"
          type="number"
          lazy-rules
          v-model="produit.stockProduit"
        />
        <div
          v-if="selected.length"
          class="fit row no-wrap justify-between items-center content-start q-mt-lg"
        >
          <div>
            <q-btn
              :loading="loading[1]"
              icon="cloud_upload"
              type="submit"
              color="positive"
              label="Modifier"
            >
              <template v-slot:loading>
                <q-spinner-dots class="on-left" />
                MODIFIER
              </template>
            </q-btn>
          </div>
          <div>
            <q-btn round color="negative" icon="delete" @click="onDelete" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { getAllProduits, updateProduit, deleteProduit } from "src/api/produit";

export default defineComponent({
  name: "PageProduit",
  data() {
    return {
      pagination: {
        rowsPerPage: 8,
        label: "Nombre de produit par page",
      },
      produit: {
        numProduit: "",
        designProduit: "",
        puProduit: "",
        stockProduit: "",
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
        name: "numProduit",
        required: true,
        label: "ID",
        align: "left",
        field: (row) => row.numProduit,
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
        name: "puProduit",
        label: "Prix Unitaire",
        field: "puProduit",
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

    const rows = ref([]);

    getAllProduits()
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
      this.produit.numProduit = obj.numProduit;
      this.produit.designProduit = obj.designProduit;
      this.produit.puProduit = obj.puProduit;
      this.produit.stockProduit = obj.stockProduit;
    },
    onSubmit() {
      this.simulateProgress(1);
      this.timer = setTimeout(() => {
        updateProduit(this.produit.numProduit, this.produit)
          .then(() => {
            this.editing = false;
            this.toast.notify({
              type: "positive",
              message: "Le produit a bien été modifié",
              icon: "edit_note",
              position: "bottom-right",
            });
            getAllProduits()
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
              message:
                "Erreur lors de la mise à jour des informations du produit",
              position: "bottom-right",
            });
          });
      }, 1500);
    },
    onDelete() {
      this.toast
        .dialog({
          dark: true,
          title: "Confirmer la suppression",
          message: "Voulez-vous supprimer le client : " + this.produit.designProduit,
          cancel: true,
          ok: "Supprimer",
          cancel: "Annuler",
          persistent: true,
          transitionHide: "fade",
        })
        .onOk(() => {
          deleteProduit(this.produit.numProduit)
            .then(() => {
              this.editing = false;
              this.toast.notify({
                type: "warning",
                message: "Le produit a bien été supprimé",
                icon: "edit_note",
                position: "bottom-right",
              });
              // const index = this.rows
              //   .map((object) => object.numClient)
              //   .indexOf(this.client.numClient);
              // this.rows.splice(index, 1);
              getAllProduits()
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
                message: "Erreur lors de la suppression du produit",
                position: "bottom-right",
              });
            });
        });
    },
  },
});
</script>
