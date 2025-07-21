<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import {AccountRowPerformance} from "@/models/AccountRowPerformance"
    import { useAccountStore } from '@/stores/accountStore';
    import AccountListRow from "./AccountListRow.vue"

    const accountStore = useAccountStore();
    const recordsRows = ref<AccountRowPerformance[]>([]);

    const createNewRecord = () => {
      recordsRows.value.push(AccountRowPerformance.create([], 'local', '', ''));
    }

    const saveValidatedRecord = (index: number, validatedRecord: AccountRowPerformance) => {
      if (index < accountStore.getRecords.length) {
        accountStore.updateRecord(index, validatedRecord)
        console.log(`update`)
      } 
      else {
        accountStore.addRecord(validatedRecord)
        console.log(`save`)
      }
      
      recordsRows.value[index] = validatedRecord
    }

    const deleteRecord = (index: number) => {
      accountStore.deleteRecord(index);
      if (index !== -1) {
        recordsRows.value.splice(index, 1)
      }
      
      if (recordsRows.value.length === 0) {
        createNewRecord()
      }
    }

    onMounted(() =>
      {
        recordsRows.value = accountStore.loadFromLocalStorage();
        if(recordsRows.value.length == 0)
        {
          recordsRows.value.push(AccountRowPerformance.create([], 'local', 'default', ''));
        }
      }
    )

    defineExpose(
    {
      createNewRecord
    }
  )
</script>

<template>
  <div class="table-container min-h-[300px] max-h-[450px] overflow-y-scroll">
    <table class="table-auto relative box-border w-[100%] border-separate border-spacing-y-6">
      <thead class="sticky top-0 right-0 left-0 z-50 bg-white/10 backdrop-blur-md">
        <tr class="text-left text-sm text-neutral-400 font-thin">
          <th>Метки</th>
          <th></th>
          <th>Тип записи</th>
          <th></th>
          <th>Логин</th>
          <th></th>
          <th>Пароль</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody class="max-h-[500px]">
        <AccountListRow
          v-for="(record, index) in recordsRows"
          :key="index"
          :record="record"
          @save="saveValidatedRecord(index, $event)"
          @delete="deleteRecord(index)"
        />
      </tbody>
    </table>
  </div>
</template>

<style>
  .table-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
  }
</style>