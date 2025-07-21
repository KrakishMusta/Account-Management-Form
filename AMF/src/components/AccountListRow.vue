<script setup lang="ts">
  import { ref, watch, computed, reactive, onMounted } from 'vue';
  import {AccountRowPerformance} from "@/models/AccountRowPerformance"

  const props = defineProps({
    record: {
      type: AccountRowPerformance, // Указываем класс как тип
      required: true,
      default: () => new AccountRowPerformance() // Фабрика по умолчанию
    }
  });

  const emit = defineEmits(['save', 'change', 'delete']);

  interface ValidationResult {
    isValid: boolean;
    errors: {
      tags?: string;
      login?: string;
      password?: string;
    };
  };

  const validationStatus = ref<ValidationResult>({
    isValid: false,
    errors: {
      tags: '',
      login: '',
      password: ''
    }
  });

  const tagsRef = ref(null);
  const recordingTypeRef = ref(null);
  const loginRef = ref(null);
  const passwordRef = ref(null);

  const tagsInput = ref('');
  const loginInput = ref('');
  const passwordInput = ref('');

  const recordingType = ref('1');

  const rowValidation = (): ValidationResult => {
    const result: ValidationResult = {
      isValid: true,
      errors: {
        tags: '',
        login: '',
        password: ''
      }
    };

    if (tagsInput.value.trim() === '') {
      result.isValid = false;
      result.errors.tags = 'Метка не может быть пустой';
    }

    if (loginInput.value.trim() === '') {
      result.isValid = false;
      result.errors.login = 'Логин не может быть пустым';
    }

    if (recordingType.value === '1') {
      if (passwordInput.value.trim() === '') {
        result.isValid = false;
        result.errors.password = 'Пароль не может быть пустым';
      }
    }

    return result;
  };

  const saveRequest = () => {

  };

  const handleBlur = () => {
    const validation = rowValidation();
      validationStatus.value = {
      ...validationStatus.value,
      ...validation
    };
    console.log(validationStatus)
    if (validation.isValid)
    {
      saveRequest();
    }
  };

  onMounted(() => {
      tagsInput.value = Array.isArray(props.record.tags) 
      ? props.record.tags.join('; ') 
      : props.record.tags || '';

      recordingType.value = props.record.method === 'local' ? '1' : '2';
      console.log(recordingType.value)
      
      loginInput.value = props.record.login || ''; // Добавляем заполнение логина

      if (props.record.method === 'local')
      {
          passwordInput.value = props.record.password || '';
      }
  })
</script>

<template>
  <tr class="row h-fit">
    <td class="relative border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black h-fit">
        <textarea 
          :tabindex="2" 
          ref="tagsRef" 
          v-model="tagsInput"
          @blur="handleBlur"
          maxlength="50"
          placeholder="Метка" 
          class="        
            inline-block 
            resize-none 
            text-[14px] 
            leading-5
            p-2 
            text-left 
            box-border 
            w-[100%]
            align-middle
            content-center
            focus:outline-none 
            focus:ring-0 
            focus:border-none
          "
          @keydown.enter.prevent="tagsInput += '\n'"
        ></textarea>
        <span 
          v-if="validationStatus.errors.tags !== ''"
          class="absolute top-full left-0 text-xs text-red-500 mt-1"
          :class="{' border-red-500': validationStatus.errors.tags !== ''}"
        >
          Максимум 50 символов
        </span>
        <span 
          class="absolute top-full right-0 text-xs text-gray-500 mt-1"
          :class="{'text-red-500 mt-1': validationStatus.errors.tags !== ''}"
        >
          {{ tagsInput.length }}/50
        </span>
    </td>
    <td class="w-3"></td>
    <td class="border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black p-0 h-fit">
      <select :tabindex="3" ref="recordingTypeRef" 
      v-model="recordingType"
      @change="handleBlur"      
      class="text-[14px] leading-[14px] p-2 focus:outline-none focus:ring-0 focus:border-none w-fit h-full">
        <option value="1" selected>Локальная</option>
        <option value="2">LDAP</option>
      </select>
    </td>
    <td class="w-3"></td>
    <td 
      class="relative border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black p-0 h-fit"
      :colspan="recordingType === '2' ? 3 : 1"
      >
      <input :tabindex="4" ref="loginRef" placeholder="Логин" type="text"
      v-model="loginInput"
      @blur="handleBlur"
      maxlength="100"
      autocomplete="username"
      class="w-full h-full text-[14px] leading-8 p-2 focus:outline-none focus:ring-0 focus:border-none"
      :class="{' border-red-500': validationStatus.errors.login !== ''}"     
      >
      <!-- v-if="validationStatus.errors.login !== ''" -->
      <span 
          class="absolute top-full left-0 text-xs text-red-500 mt-1"
          >
          {{ validationStatus.errors.login }}
        </span>
        <span 
          class="absolute top-full right-0 text-xs text-gray-500 mt-1"
          :class="{'text-red-500 mt-1':  validationStatus.errors.login !== ''}"
        >
          {{ loginInput.length }}/100
        </span>
    </td>
    <td v-if="recordingType == '1'" class="w-3"></td>
    <td 
      v-if="recordingType == '1'"
      class="relative border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black p-0 h-fit"
      >
      <input :tabindex="5" ref="passwordRef" placeholder="Пароль" type="password"
      v-model="passwordInput"
      @blur="handleBlur"
      maxlength="100"
      autocomplete="new-password"
      class="w-full h-full text-[14px] leading-8 p-2 focus:outline-none focus:ring-0 focus:border-none">
        <span 
          v-if="validationStatus.errors.tags  !== ''"
          class="absolute top-full left-0 text-xs text-red-500 mt-1"
          :class="{' border-red-500': validationStatus.errors.password !== ''}"
        >
          {{ validationStatus.errors.password }}
        </span>
        <span 
          class="absolute top-full right-0 text-xs text-gray-500 mt-1"
          :class="{'text-red-500 mt-1': validationStatus.errors.password !== ''}"
        >
          {{ passwordInput.length }}/100
      </span>
    </td>
    <td class="w-3"></td>
    <td class="w-1">
      <button :tabindex="6" 
      class="w-10 h-10 border rounded-md p-2 border-black box-border hover:bg-slate-400 transition-colors">
        <svg class="block w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </td>
  </tr>
</template>

<style scoped>

</style>