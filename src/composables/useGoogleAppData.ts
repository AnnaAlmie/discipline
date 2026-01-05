import { ref } from 'vue'

declare global {
  interface Window {
    google: any
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const SCOPES = 'https://www.googleapis.com/auth/drive.appdata'
const FILE_NAME = 'app-data.json'

export interface AppData {
  [key: string]: any
}

export function useGoogleAppData() {
  const accessToken = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /* ---------------- AUTH ---------------- */

  function login(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject('Google SDK not loaded')
        return
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse: any) => {
          if (tokenResponse?.access_token) {
            accessToken.value = tokenResponse.access_token
            resolve(tokenResponse.access_token)
          } else {
            reject('Noaining access token')
          }
        },
      })

      client.requestAccessToken()
    })
  }

  /* ---------------- FILE ---------------- */

  async function findFile(): Promise<{ id: string } | null> {
    if (!accessToken.value) return null

    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='${FILE_NAME}'&spaces=appDataFolder`,
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    )

    const json = await res.json()
    return json.files?.[0] ?? null
  }

  async function createFile(data: AppData) {
    if (!accessToken.value) return null

    const metadata = {
      name: FILE_NAME,
      parents: ['appDataFolder'],
    }

    const boundary = '-------vue-google-appdata'
    const body =
      `--${boundary}\r\n` +
      `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
      JSON.stringify(metadata) +
      '\r\n' +
      `--${boundary}\r\n` +
      `Content-Type: application/json\r\n\r\n` +
      JSON.stringify(data) +
      '\r\n' +
      `--${boundary}--`

    const res = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body,
      },
    )

    return await res.json()
  }

  async function updateFile(fileId: string, data: AppData) {
    if (!accessToken.value) return null

    const res = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    return await res.json()
  }

  async function readFile(fileId: string): Promise<AppData | null> {
    if (!accessToken.value) return null

    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    return await res.json()
  }

  /* ---------------- PUBLIC API ---------------- */

  async function save(data: AppData) {
    loading.value = true
    error.value = null

    try {
      if (!accessToken.value) {
        await login()
      }

      const file = await findFile()

      if (!file) {
        return await createFile(data)
      }

      return await updateFile(file.id, data)
    } catch (err: any) {
      error.value = err?.message || String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function load(): Promise<AppData | null> {
    loading.value = true
    error.value = null

    try {
      if (!accessToken.value) {
        await login()
      }

      const file = await findFile()
      if (!file) return null

      return await readFile(file.id)
    } catch (err: any) {
      error.value = err?.message || String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    login,
    save,
    load,
    loading,
    error,
  }
}
