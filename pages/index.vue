<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote.min.css',
    },
  ],
  // script: [
  //   { src: 'https://code.jquery.com/jquery-3.5.1.min.js', async: false },
  //   {
  //     src: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js',
  //     async: false,
  //   },
  //   {
  //     src: 'https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote.min.js',
  //     async: false,
  //   },
  // ],
})

const all3PartyScriptsLoaded = Promise.all([
  useScript('https://code.jquery.com/jquery-3.5.1.min.js')._loadPromise,
  useScript(
    'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js',
  )._loadPromise,
  useScript(
    'https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote.min.js',
  )._loadPromise,
])

onMounted(async () => {
  await all3PartyScriptsLoaded
  $log('onMounted', all3PartyScriptsLoaded)
  $('#summernote').summernote()
  $('#summernote').on('summernote.enter', function (we, e) {
    // $(this).summernote("pasteHTML", `&nbsp\n&nbsp`);
    $(this).summernote('insertText', `\n`)
    e.preventDefault()
  })
})
</script>

<script>
const file = ref(null)

function onFilePick(event) {
  file.value = event.target.files[0]
  $log('onFilePick', file)
  if (file.value) {
    const reader = new FileReader()
    reader.onload = function (e) {
      const content = e.target.result
      // Set the content in Summernote
      $log('file readAsText: ', content)
      // $('#summernote').summernote('pasteHTML', content)
      $('#summernote').summernote('code', content)
    }
    reader.readAsText(file.value)
  }
}

function onFileSave() {
  const text = $('#summernote').summernote('code')
  downloadText(text, file.value.name)
}
</script>

<template>
  <div id="root">
    <div id="toolbar">
      <label for="filepicker">
        <input
          type="file"
          id="filepicker"
          @change="onFilePick"
        />
      </label>
      <button @click="onFileSave">Save</button>
    </div>
    <div id="summernote">
      <pre>
    Hello Summernote
    
    Salvete Summernote
      </pre>
    </div>
  </div>
</template>
