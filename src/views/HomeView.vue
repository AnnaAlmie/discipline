<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import { useGoogleDriveTodos } from '@/composables/useGoogleDriveTodos'
import Button from '@/components/atoms/Button.vue'

const { isLoggedIn } = useFirebaseAuth()
const { todos, loadTodos, saveTodos, addTodo, toggleTodo, deleteTodo } = useGoogleDriveTodos()

const newTodo = ref('')

async function handleAddTodo() {
  if (!newTodo.value.trim()) return
  addTodo(newTodo.value, 'daily', new Date().toISOString())
  newTodo.value = ''
  await saveTodos()
}

async function handleToggle(id: string) {
  toggleTodo(id)
  await saveTodos()
}

async function handleDelete(id: string) {
  deleteTodo(id)
  await saveTodos()
}

onMounted(async () => {
  if (isLoggedIn.value) {
    await loadTodos()
  }
})
</script>

<template>
  <h1 class="">Google Drive Todo List</h1>
  <Button>test</Button>
  <div class="max-w-md mx-auto p-4 rounded-2xl shadow">
    <!-- Add Todo -->
    <div class="flex mb-4">
      <input
        v-model="newTodo"
        type="text"
        placeholder="New todo..."
        class="flex-1 border px-2 py-1 rounded"
      />
      <Button
        color="indigo-darken-3"
        class="ml-2 px-4 py-1 text-white rounded"
        @click="handleAddTodo"
      >
        Add
      </Button>
    </div>

    <!-- Todo List -->
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center justify-between border-b py-2"
      >
        <span
          :class="{ 'line-through text-gray-500': todo.done }"
          @click="handleToggle(todo.id)"
          class="cursor-pointer"
        >
          {{ todo.title }}
        </span>
        <button class="px-2 py-1 bg-red-500 rounded" @click="handleDelete(todo.id)">✕</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
