<template>
  <q-input dark standout label="Recherche d'une commande">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
  <q-card dark flat class="my-card q-my-lg bg-secondary">
    <q-card-section>
      <div class="text-h6">Ajout d'une nouvelle commande</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card dark flat class="my-card q-my-lg bg-secondary">
    <q-card-section>
      <div class="text-h6">Consulter la liste des commandes</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Liste</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {};
</script>
