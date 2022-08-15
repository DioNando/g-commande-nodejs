<template>
  <div
    class="text-h5 text-accent q-mb-sm full-width row no-wrap justify-between items-start content-start"
  >
    <div>Commande</div>
    <q-icon name="local_mall" />
  </div>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'une nouvelle commande</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="modal = true">Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card flat bordered class="my-card q-mt-lg">
    <q-card-section>
      <div class="text-h6">Consulter la liste des commandes</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="router.push(`/commande`)">Liste</q-btn>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="modal" transition-hide="fade">
    <q-card
      class="bg-dark text-white q-pa-sm"
      style="width: 750px; max-width: 80vw"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5">Ajouter une nouvelle commande</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" @reset="onReset">
          <div
            class="full-width no-wrap row justify-between items-start content-start"
          >
            <q-input
              label="ID du client"
              type="text"
              v-model="client.numClient"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Veuillez saisir un client valide',
              ]"
              class="col q-mr-md"
              @keyup="selectClient"
            />
            <q-input
              label="Nom du client"
              type="text"
              v-model="client.nomClient"
              readonly
              borderless
              class="col q-ml-md"
            />
          </div>
          <div
            class="full-width no-wrap row justify-between items-start content-start"
          >
            <q-input
              label="ID du produit"
              type="text"
              v-model="produit.numProduit"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Veuillez saisir un produit valide',
              ]"
              class="col q-mr-md"
              @keyup="
                selectProduit();
                calculMontant();
              "
            />
            <q-input
              label="Designation"
              type="text"
              v-model="produit.designProduit"
              readonly
              borderless
              class="col q-ml-md"
            />
          </div>
          <div
            class="full-width no-wrap row justify-between items-start content-start"
          >
            <q-input
              label="Prix Unitaire"
              type="number"
              v-model="produit.puProduit"
              readonly
              borderless
              class="col q-mr-md"
            />
            <q-input
              label="Stock"
              type="number"
              v-model="produit.stockProduit"
              readonly
              borderless
              class="col q-mx-md"
            />
            <q-input
              label="Quantité"
              type="number"
              v-model="produit.qte"
              class="col q-mx-md"
              @change="calculMontant"
            />
            <q-input
              label="Montant"
              prefix="Ar"
              type="number"
              v-model="produit.montant"
              readonly
              borderless
              class="col q-ml-md"
            />
          </div>
          <div align="left" class="q-mt-lg">
            <q-btn
              label="Ajouter"
              icon="cloud_upload"
              type="submit"
              color="positive"
            />
            <q-btn
              label="Effacer"
              type="reset"
              color="grey-1"
              outline
              class="q-ml-lg"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, QSpinnerDots } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addCommande } from "src/api/commande";
import { getClient } from "src/api/client";
import { getProduit } from "src/api/produit";

export default {
  name: "NavCommande",
  data() {
    return {
      produit: {
        numProduit: "",
        designProduit: "",
        puProduit: "",
        stockProduit: "",
        qte: "",
        montant: "",
      },
      client: {
        numClient: "",
        nomClient: "",
      },
      commande: {
        numClient: "",
        numProduit: "",
        qte: "",
      },
    };
  },
  setup() {
    const toast = useQuasar();
    const router = useRouter();
    const $q = useQuasar();
    let timer = null;

    return {
      router,
      modal: ref(false),
      timer,
      $q,
      toast,
    };
  },
  methods: {
    onSubmit() {
      this.commande.numClient = this.client.numClient;
      this.commande.numProduit = this.produit.numProduit;
      this.commande.qte = this.produit.qte;

      this.$q.loading.show({
        spinner: QSpinnerDots,
        message: "Informations en cours de traitement, patientez...",
      });
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        addCommande(this.commande)
          .then(() => {
            // this.router.push(`/produit`);
            this.toast.notify({
              color: "positive",
              textColor: "white",
              icon: "cloud_done",
              message: "Nouvelle commande ajoutée",
              position: "bottom-right",
            });
            this.modal = false;
          })
          .catch((error) => {
            console.log(error);
            this.toast.notify({
              type: "negative",
              textColor: "White",
              icon: "warning",
              message: "Erreur lors de l'ajout de la commande",
              position: "bottom-right",
            });
          });

        this.timer = void 0;
      }, 1000);
    },

    onReset() {
      this.produit.designProduit = "";
      this.produit.puProduit = "";
      this.produit.stockProduit = "";
    },

    selectClient() {
      getClient(this.client.numClient)
        .then((result) => {
          this.client.nomClient = result.data.nomClient;
        })
        .catch((error) => {
          console.log(error);
          this.toast.notify({
            type: "negative",
            textColor: "White",
            icon: "warning",
            message: "Client introuvable",
            position: "bottom-right",
          });
        });
    },

    selectProduit() {
      getProduit(this.produit.numProduit)
        .then((result) => {
          this.produit.designProduit = result.data.designProduit;
          this.produit.puProduit = result.data.puProduit;
          this.produit.stockProduit = result.data.stockProduit;
        })
        .catch((error) => {
          console.log(error);
          this.toast.notify({
            type: "negative",
            textColor: "White",
            icon: "warning",
            message: "Produit introuvable",
            position: "bottom-right",
          });
        });
    },

    calculMontant() {
      this.produit.montant = this.produit.puProduit * this.produit.qte;
    },
  },
};
</script>
