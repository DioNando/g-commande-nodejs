<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->

          <span @click="router.push(`/`)" style="cursor: pointer"
            >Gestion des commandes</span
          >
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs
        align="left"
        indicator-color="transparent"
        active-color="white"
        class="text-grey-5 bg-dark shadow-6"
        
      >
        <q-route-tab to="/client" label="Client" />
        <q-route-tab to="/produit" label="Produit" />
        <q-route-tab to="/commande" label="Commande" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" :width="400">
      <q-page padding>
        <div class="shadow-10 rounded-borders q-pa-md q-mb-lg"><NavCommande /></div>
        <div class="shadow-10 rounded-borders q-pa-md q-mb-lg"><NavClient /></div>
        <div class="shadow-10 rounded-borders q-pa-md q-mb-lg"><NavProduit /></div>
        <div><NavIndex /></div>
      </q-page>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavIndex from "../components/NavIndex.vue";
import NavClient from "src/components/NavClient.vue";
import NavProduit from "../components/NavProduit.vue";
import NavCommande from "../components/NavCommande.vue";

export default {
  components: {
    NavIndex,
    NavClient,
    NavProduit,
    NavCommande,
  },
  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(true);

    return {
      router,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
