<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import AccountListRow from "./AccountListRow.vue"
    import {AccountRowPerformance} from "@/models/AccountRowPerformance"

    const recordsRows = ref<AccountRowPerformance[]>([]);

    const createNewRecord = () =>
    {
        // recordsRows.value.push(AccountRowPerformance.create('[]', 'local', '', ''));
        //тест
        recordsRows.value.push(AccountRowPerformance.create('tag1;tag2', 'local', 'login', 'pass'));
        //тест1
        recordsRows.value.push(AccountRowPerformance.create('tag1;tag2', 'ldap', 'login', null));
    }

    const saveNewRecord = () =>
    {

    }

    // Обновление записи
    const rewriteRecord = (index: number, updatedRecord: AccountRowPerformance) => {
      recordsRows.value[index] = new AccountRowPerformance(
        updatedRecord.tags,
        updatedRecord.method,
        updatedRecord.login,
        updatedRecord.password
      );
    };

    // Удаление записи
    const deleteRecord = (index: number) => {
      recordsRows.value.splice(index, 1);
    };

    onMounted(() =>
      {
        if(recordsRows.value.length == 0)
        {
          recordsRows.value.push(AccountRowPerformance.create([], 'local', '', ''));
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
          @update:record="rewriteRecord(index, $event)"
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