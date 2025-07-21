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
      
      // Если буфер пуст - добавляем новую пустую запись
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
  <div class="table-container">
    <table class="table-auto box-border w-[100%] border-separate border-spacing-y-6">
      <thead>
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
      <tbody class="max-h-[500px] overflow-y-auto">
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
    justify-content: center;
    height: 100%;
  }
</style>