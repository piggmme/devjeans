<script lang="ts">
  import {t} from 'svelte-i18n'
  import {canvas} from 'src/store/canvas'
  import Modal from '../Modal/Modal.svelte'
  import {onMount} from 'svelte'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {userInfo} from 'src/store/user'
  import {toast} from '@zerodevx/svelte-toast'
  import {push} from 'svelte-spa-router'
  import {resultBunny} from 'src/store/resultBunny'

  let showModal = false
  let thumbnailImage: string = ''
  let resultImage: string = ''
  let redirectToUpload: boolean = false

  onMount(() => {
    logEvent(analytics, '저장 탭 진입')
  })

  const createImage = () => {
    const multiplier = Math.floor(1500 / $canvas.width)

    thumbnailImage = $canvas.toDataURL({format: 'jpeg', quality: 0.4})
    resultImage = $canvas.toDataURL({format: 'png', quality: 1, multiplier})
  }

  const handleSaveImage = () => {
    createImage()
    showModal = true
  }

  const saveImage = () => {
    const link = document.createElement('a')
    link.download = 'dev-jeans.png'
    link.href = resultImage
    link.click()
  }

  const handleUpload = () => {
    if (!$userInfo) {
      toast.push($t('saveTap.modalAlert'), {
        theme: {
          '--toastBackground': '#ff595eaa',
        },
      })
      push('/login?redirect=decorate')
      return
    }
    redirectToUpload = true
    createImage()
  }

  $: if (resultImage || thumbnailImage) {
    $resultBunny = {
      origin: resultImage,
      thumbnail: thumbnailImage,
    }
  }

  $: if ($resultBunny?.origin && redirectToUpload) {
    push('/upload')
  }
</script>

<Modal bind:showModal>
  <h2 slot="header">{$t('saveTap.modalTitle')}</h2>
  <img src={resultImage} alt="데브진스" />
  <button class="save" on:click={saveImage}>{$t('saveTap.modalSave')}</button>
</Modal>

<div class="container">
  <h2>{$t('saveTap.title')}</h2>
  <!-- <button class="upload" on:click={handleUpload}>{$t('saveTap.uploadAction')}</button> -->
  <button on:click={handleSaveImage}>{$t('saveTap.saveAction')}</button>
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
    word-break: keep-all;
  }

  .upload {
    color: #fff;
    background-color: #8ac926c8;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
  }

  button {
    box-sizing: border-box;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    margin-bottom: 5px;
    font-size: 12px;
    max-width: 300px;
  }

  .save {
    margin-top: 20px;
    max-width: none;
  }
</style>
