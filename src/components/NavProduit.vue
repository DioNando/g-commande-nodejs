<template>
  <div
    class="text-h5 text-positive q-mb-sm full-width row no-wrap justify-between items-center content-start"
  >
    <div>Produit</div>
    <q-icon name="inventory_2" />
  </div>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'un nouveau produit</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="modal = true">Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card dark bordered flat class="my-card q-mt-lg">
    <q-card-section>
      <div class="text-h6">Consulter la liste des produits</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="router.push(`/produit`)">Liste</q-btn>
    </q-card-actions>
  </q-card>
  <!-- <q-card dark bordered flat class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Liste des produits par client</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Liste par client</q-btn>
    </q-card-actions>
  </q-card> -->
  <q-dialog v-model="modal" transition-hide="fade">
    <q-card
      class="bg-dark text-white q-pa-sm"
      style="width: 500px; max-width: 80vw"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 row no-wrap items-center text-positive">
          <q-icon name="inventory_2" />
          <div class="q-ml-sm">Ajouter un nouveau produit</div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" @reset="onReset">
          <q-input
            label="Designation du produit"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Veuillez saisir un nom valide',
            ]"
            v-model="produit.designProduit"
          />
          <div
            class="full-width no-wrap row justify-between items-start content-start"
          >
            <q-input
              label="Prix Unitaire"
              prefix="Ar"
              type="number"
              v-model="produit.puProduit"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Le prix doit être superieur à zero',
              ]"
              class="col q-mr-md"
            />
            <q-input
              label="Stock"
              type="number"
              v-model="produit.stockProduit"
              class="col q-ml-md"
            />
          </div>
          <div align="right" class="q-mt-sm">
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
import { addProduit } from "src/api/produit";

export default {
  name: "NavProduit",
  data() {
    return {
      produit: {
        designProduit: "",
        puProduit: "",
        stockProduit: "",
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
      this.$q.loading.show({
        spinner: QSpinnerDots,
        message: "Informations en cours de traitement, patientez...",
      });
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        addProduit(this.produit)
          .then(() => {
            // this.router.push(`/produit`);
            this.toast.notify({
              color: "positive",
              textColor: "white",
              icon: "cloud_done",
              message: "Nouveau produit ajouté",
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
              message: "Erreur lors de l'ajout du produit",
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
  },
};
</script>
