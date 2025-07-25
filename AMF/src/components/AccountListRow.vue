<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import {AccountRowPerformance} from "@/models/AccountRowPerformance"

  const props = defineProps({
    record: {
      type: AccountRowPerformance,
      required: true
    }
  })

  const emit = defineEmits(['save', 'delete'])

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

  const localRecord = ref<AccountRowPerformance>(props.record)
  const tagsInput = ref('')
  const loginInput = ref('')
  const passwordInput = ref('')
  const recordingType = ref('1')

  const isShowPassword = ref(false);

  const rowValidation = (): ValidationResult => {
    const result: ValidationResult = {
      isValid: true,
      errors: {
        login: '',
        password: ''
      }
    };

    if (loginInput.value.trim() === '') {
      result.isValid = false;
      result.errors.login = 'Логин не может быть пустым';
    }

    if (recordingType.value === '1') {
      if (passwordInput.value.trim() === '' || passwordInput.value == null) {
        result.isValid = false;
        result.errors.password = 'Пароль не может быть пустым';
      }
    }

    validationStatus.value = result;
    return result;
  };

  const handleSave = () => {
    const validation = rowValidation();
    if (validation.isValid) {
      const updatedRecord = AccountRowPerformance.create(
        tagsInput.value,
        recordingType.value === '1' ? 'local' : 'ldap',
        loginInput.value,
        recordingType.value === '1' ? passwordInput.value : null
      )
      emit('save', updatedRecord)
    }
  }

  const handleDelete = () => {
    emit('delete');
  }

  const initInputs = () => {
    tagsInput.value = Array.isArray(localRecord.value.tags) 
      ? localRecord.value.tags.join('; ') 
      : localRecord.value.tags || ''
    
    recordingType.value = localRecord.value.method === 'local' ? '1' : '2'
    loginInput.value = localRecord.value.login || ''
    passwordInput.value = localRecord.value.password || ''
  }

  onMounted(async () => {
      await initInputs();
  })
</script>

<template>
  <tr class="row h-fit">
    <td class="relative border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black h-fit">
        <textarea 
          :tabindex="2" 
          ref="tagsRef" 
          v-model="tagsInput"
          @blur="handleSave"
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
          class="absolute top-full right-0 text-xs text-gray-500 mt-1"
        >
          {{ tagsInput.length }}/50
        </span>
    </td>
    <td class="w-3"></td>
    <td class="border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black p-0 h-fit">
      <select :tabindex="3" ref="recordingTypeRef" 
      v-model="recordingType"
      @change="handleSave"      
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
      @blur="handleSave"
      maxlength="100"
      autocomplete="username"
      class="
        w-full h-full 
        text-[14px] leading-8 p-2 
        focus:outline-none focus:ring-0 focus:border-none
        align-middle
        content-center      
      "
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
      class="relative border rounded focus-within:border-black focus-within:ring-1 focus-within:ring-black p-0 h-full"
    >
      <div class="flex items-center h-full">
        <input 
          :tabindex="5" 
          ref="passwordRef" 
          placeholder="Пароль" 
          :type="!isShowPassword ? 'password' : 'text'"
          v-model="passwordInput"
          @blur="handleSave"
          maxlength="100"
          autocomplete="new-password"
          class="flex-grow h-full text-[14px] leading-8 p-2 focus:outline-none focus:ring-0 focus:border-none"
        >
        <button @click="() => {isShowPassword = !isShowPassword}" class="flex-shrink-0 h-full px-2 flex items-center justify-center">
          <svg v-if="!isShowPassword" class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#0F0F0F"/>
            <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#0F0F0F"/>
            <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#0F0F0F"/>
            <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#0F0F0F"/>
            <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#0F0F0F"/>
          </svg>
          <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z" fill="#0F0F0F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z" fill="#0F0F0F"/>
          </svg>
        </button>
      </div>
      <span 
        v-if="validationStatus.errors.password !== ''"
        class="absolute top-full left-0 text-xs text-red-500 mt-1"
        :class="{' border-red-500': validationStatus.errors.password !== ''}"
      >
        {{ validationStatus.errors.password, 1 }}
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
      @click="handleDelete"
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