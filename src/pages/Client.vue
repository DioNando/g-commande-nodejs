<template>
  <q-page
    padding
    class="full-width no-wrap row justify-between items-start content-start"
  >
    <q-table
      grid
      title="Liste des clients"
      :rows="rows"
      :columns="columns"
      row-key="numClient"
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
          label="Recherche d'un client"
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

    <div class="q-ml-md" style="width: 25rem">
      <div class="q-pa-lg bg-dark shadow-6 rounded-borders">
        <q-form @submit.prevent="onSubmit">
          <!-- <q-form> -->
          <div v-if="selected.length" class="text-h5">
            Informations du client
          </div>
          <div v-else class="text-h5">Aucun client selectionné</div>
          <q-input
            label="Identification du client"
            readonly
            borderless
            v-model="client.numClient"
          />

          <q-input
            label="Nom"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Veuillez saisir un nom valide',
            ]"
            v-model="client.nomClient"
          />
          <div
            v-if="selected.length"
            class="fit row no-wrap justify-between items-center content-start"
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
        <q-form
          v-if="selected.length"
          @submit.prevent="onSubmitDates"
          class="q-mt-lg"
        >
          <div class="text-h5">Liste des produits commandés</div>
          <div
            class="full-width no-wrap row justify-between items-start content-start"
          >
            <q-input type="date" class="col q-mr-md" v-model="date.dateA" />
            <q-input type="date" class="col q-ml-md" v-model="date.dateB" />
          </div>
          <div class="q-mt-lg" align="right">
            <q-btn
              :loading="loading[2]"
              icon="search"
              color="primary"
              label="Consulter"
              type="submit"
            >
              <template v-slot:loading>
                <q-spinner-dots class="on-left" />
                CONSULTER
              </template>
            </q-btn>
          </div>
        </q-form>
      </div>
      <div v-if="this.rowsClient.length" class="q-mt-lg">
        <q-table
          :rows="rowsClient"
          :columns="columnsClient"
          flat
          dark
          separator="none"
          bordered
          v-model:pagination="paginationAll"
          hide-bottom
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import {
  getAllClients,
  updateClient,
  deleteClient,
  getChiffreAffairesClient,
} from "src/api/client";

export default defineComponent({
  name: "PageClient",
  data() {
    return {
      pagination: {
        rowsPerPage: 12,
        label: "Nombre de client par page",
      },
      paginationAll: {
        rowsPerPage: 0,
      },
      client: {
        numClient: "",
        nomClient: "",
      },
      date: {
        dateA: "",
        dateB: "",
      },
    };
  },
  methods: {
    onRowClick(row) {
      this.selected = [];
      this.selected.push(row);
      const obj = JSON.parse(JSON.stringify(this.selected[0].rows[0]));
      this.client.numClient = obj.numClient;
      this.client.nomClient = obj.nomClient;

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      var lastYear = yyyy - 1 + "-" + mm + "-" + dd;
      this.date.dateA = lastYear;
      this.date.dateB = today;
    },
    onSubmit() {
      this.simulateProgress(1);
      this.timer = setTimeout(() => {
        updateClient(this.client.numClient, this.client)
          .then(() => {
            this.editing = false;
            this.toast.notify({
              type: "positive",
              message: "Le client a bien été modifié",
              icon: "edit_note",
              position: "bottom-right",
            });
            getAllClients()
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
                "Erreur lors de la mise à jour des informations du client",
              position: "bottom-right",
            });
          });
      }, 1500);
    },
    onSubmitDates() {
      this.simulateProgress(2);
      this.timer = setTimeout(() => {
        getChiffreAffairesClient(this.client.numClient, this.date)
          .then((result) => {
            this.rowsClient = result.data;
            console.log(result.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1500);
    },
    onDelete() {
      this.toast
        .dialog({
          dark: true,
          title: "Confirmer la suppression",
          message: "Voulez-vous supprimer le client : " + this.client.nomClient,
          cancel: true,
          ok: "Supprimer",
          cancel: "Annuler",
          persistent: true,
          transitionHide: "fade",
        })
        .onOk(() => {
          deleteClient(this.client.numClient)
            .then(() => {
              this.editing = false;
              this.toast.notify({
                type: "warning",
                message: "Le client a bien été supprimé",
                icon: "edit_note",
                position: "bottom-right",
              });
              // const index = this.rows
              //   .map((object) => object.numClient)
              //   .indexOf(this.client.numClient);
              // this.rows.splice(index, 1);
              getAllClients()
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
                message: "Erreur lors de la suppression du client",
                position: "bottom-right",
              });
            });
        });
    },
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
    ];

    const columnsClient = [
      {
        name: "designProduit",
        required: true,
        label: "Designation Produit",
        align: "left",
        field: (row) => row.designProduit,
        sortable: true,
      },
      {
        name: "dateCommande",
        label: "Date",
        field: "dateCommande",
        align: "right",
      },
    ];

    const rows = ref([]);
    const rowsClient = ref([]);

    getAllClients()
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
      columnsClient,
      rows,
      rowsClient,
      progress,
      simulateProgress,
      loading,
      timer,
    };
  },
});
</script>
