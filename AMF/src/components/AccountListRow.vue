<script setup lang="ts">
  import { ref } from 'vue';
  const tagsRef = ref(null);
  const recordingTypeRef = ref(null);
  const loginRef = ref(null);
  const passwordRef = ref(null);

</script>

<template>
  <tr class="row">
    <td class="border rounded min-h-10 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
      <!-- <textarea ref="targetsRef" placeholder="Метка" class="inline-block resize-none text-[14px] leading-10 align-middle text-left box-border w-[100%]" name="targets"></textarea> -->
       <input :tabindex="2" ref="tagsRef" placeholder="Метка" type="text" 
        class="
        h-8 text-[14px] 
        leading-8 px-2 
        focus:outline-none 
        focus:ring-0 
        focus:border-none 
        w-fit
        ">
    </td>
    <td class="border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black">
      <select :tabindex="3" ref="recordingTypeRef" class="text-[14px] leading-[14px] p-2 focus:outline-none focus:ring-0 focus:border-none w-fit">
        <option value="1" selected>Локальная</option>
        <option value="2">LDAP</option>
      </select>
    </td>
    <td class="border rounded w-4 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
      <input :tabindex="4" ref="loginRef" placeholder="Логин" type="text" class="h-8 text-[14px] leading-8 px-2 focus:outline-none focus:ring-0 focus:border-none w-fit">
    </td>
    <td class="border rounded w-4 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
      <input :tabindex="5" ref="passwordRef" placeholder="Пароль" type="password" class="h-8 text-[14px] leading-8 px-2 focus:outline-none focus:ring-0 focus:border-none w-fit">
    </td>
    <td class="w-1">
      <button :tabindex="6" class="w-10 h-10 p-2 border rounded-md border-black box-border hover:bg-slate-400 transition-colors self-end">
        <svg class="block w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </td>
  </tr>
</template>

<style scoped>

</style>