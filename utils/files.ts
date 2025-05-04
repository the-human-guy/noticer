/* Auxiliary function to open a file selection dialog */
export function selectFile(): Promise<File> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.addEventListener(
      'change',
      (e) => {
        // @ts-ignore
        resolve(e.target?.files?.[0] as File)
      },
      false,
    )
    input.click()
  })
}

/* Auxiliary function to read data from a file */
type readFunc = 'readAsText' | 'readAsArrayBuffer'

export function readFile(file: File, readerFunc: readFunc = 'readAsText') {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      resolve(e.target?.result as string)
    })
    reader[readerFunc]?.(file)
  })
}

//readAsBinaryString
//readAsArrayBuffer
//readAsDataURL
export async function selectFileAndRead(readerFunc: readFunc = 'readAsText') {
  const file = await selectFile()
  const content = await readFile(file, readerFunc)
  return content
}

export const downloadFile = (file: File) => {
  const tempEl = document.createElement('a')
  document.body.appendChild(tempEl)
  const url = window.URL.createObjectURL(file)
  tempEl.href = url
  tempEl.download = file.name
  tempEl.click()
  window.URL.revokeObjectURL(url)
}

export const downloadText = (text: string, fileName = 'new-file.txt') => {
  return downloadFile(
    new File([new Blob([text])], fileName, { type: 'text/plain' }),
  )
}
