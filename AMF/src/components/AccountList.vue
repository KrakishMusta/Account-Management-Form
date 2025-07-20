<script setup lang="ts">
    import { ref } from 'vue';
    import AccountListRow from "./AccountListRow.vue"

</script>

<template>
  <table class=" table-auto border-separate border-spacing-2 box-border -m-2">
    <thead>
      <tr class="text-left text-sm text-neutral-400 font-thin">
        <th>Метки</th>
        <th class=" w-1">Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <AccountListRow
      
      />
    </tbody>
  </table>
</template>

<style>

</style>