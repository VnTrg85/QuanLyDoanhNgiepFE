<template>
  <div ref="editor"></div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits, defineProps } from 'vue'
import Quill from 'quill'
import Button from '../components/Button.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits()
const editor = ref(null)
const quill = ref(null)

onMounted(() => {
  quill.value = new Quill(editor.value, {
    theme: 'snow',
    ...props.options,
  })

  if (props.modelValue) {
    quill.value.root.innerHTML = props.modelValue
  }

  quill.value.on('text-change', () => {
    const content = quill.value.root.innerHTML
    emit('update:modelValue', content)
  })
})

watch(
  () => props.modelValue,
  newValue => {
    if (quill.value && newValue !== quill.value.root.innerHTML) {
      quill.value.root.innerHTML = newValue
    }
  },
)
</script>

<style scoped></style>
