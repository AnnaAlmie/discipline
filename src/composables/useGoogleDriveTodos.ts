import { ref } from 'vue'
import { useFirebaseAuth } from './useFirebaseAuth'

export interface Todo {
  id: string
  title: string
  done: boolean
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  date: string
}

const todos = ref<Todo[]>([])

export function useGoogleDriveTodos() {
  const { userData } = useFirebaseAuth()

  const saveTodos = async () => {
    if (!userData.value?.accessToken) throw new Error('No access token')

    const metadata = {
      name: 'todos.json',
      parents: ['appDataFolder'],
    }

    const fileContent = JSON.stringify(todos.value)
    const form = new FormData()
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
    form.append('file', new Blob([fileContent], { type: 'application/json' }))

    await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: { Authorization: `Bearer ${userData.value.accessToken}` },
      body: form,
    })
  }

  const loadTodos = async () => {
    if (!userData.value?.accessToken) throw new Error('No access token')

    const res = await fetch(
      "https://www.googleapis.com/drive/v3/files?q=name='todos.json' and 'appDataFolder' in parents&spaces=appDataFolder&fields=files(id,name)",
      { headers: { Authorization: `Bearer ${userData.value.accessToken}` } },
    )
    const { files } = await res.json()
    if (!files || files.length === 0) {
      todos.value = []
      return
    }

    const fileId = files[0].id
    const content = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${userData.value.accessToken}` },
    })
    todos.value = await content.json()
  }

  const addTodo = (title: string, type: Todo['type'], date: string) => {
    todos.value.push({
      id: crypto.randomUUID(),
      title,
      type,
      date,
      done: false,
    })
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }

  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  return {
    todos,
    loadTodos,
    saveTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
