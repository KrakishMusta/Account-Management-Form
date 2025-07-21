<script setup lang="ts">
  import AccountList from './components/AccountList.vue';

  import { ref } from 'vue';

  const accountListRef = ref();

  const handleCreateClick = () => {
    if (accountListRef.value) {
      accountListRef.value.createNewRecord();
    }
  };

</script>

<template>
  <div class="flex mx-16 min-h-[80vh] flex-col gap-5">
    <div class="flex gap-5 h-fit">
      <h1 class="block text-black text-1xl font-bold my-auto">Учётные записи</h1>
      <button 
        @click="handleCreateClick"
        :tabindex="1" class="w-10 h-10 p-2 border rounded-md border-black box-border hover:bg-slate-400 transition-colors">
        <svg class="block w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <!-- <path d="M6 18L18 6M6 6l12 12"/> -->
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </button>
    </div>
    <div class="flex w-[100%] bg-slate-400 rounded-sm border-black box-border p-2 gap-2 items-center">
      <div class="w-8 h-8 border-2 border-white box-border rounded-3xl">
        <h1 class="text-center font-medium text-1xl text-white">?</h1>
      </div>

      <p class=" self-center flex-1">Для указание нескольких меток для одной пары логин/пароль используйте разделитель <span class=" font-extrabold">;</span></p>
    </div>
    <AccountList ref="accountListRef"/>
  </div>
</template>

<style scoped></style>