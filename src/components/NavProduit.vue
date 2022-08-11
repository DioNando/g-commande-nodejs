<template>
  <!-- <q-input dark standout label="Recherche d'un produit">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input> -->
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'un nouveau produit</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card dark bordered flat class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Consulter la liste des produits</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Liste</q-btn>
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
</template>

<script>
export default {};
</script>
