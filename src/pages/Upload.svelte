<script lang="ts">
  import {t} from 'svelte-i18n'
  import {onMount} from 'svelte'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {toast} from '@zerodevx/svelte-toast'
  import {push, replace} from 'svelte-spa-router'
  import {uploadPhoto} from 'src/api/service/photo'
  import {resultBunny} from 'src/store/resultBunny'
  import {ScaleOut} from 'svelte-loading-spinners'
  import Layout from 'src/components/Layout/Layout.svelte'
  import Noti from 'src/components/Noti.svelte'
  import defaultBunny from 'src/assets/default-bunny.png'

  let title

  $: isUploading = false

  onMount(() => {
    logEvent(analytics, '업로드 탭 진입')
  })

  $: if (!$resultBunny?.origin) {
    replace('/')
    toast.push($t('uploadTap.empty'), {
      theme: {
        '--toastBackground': '#ff595eaa',
      },
    })
  }

  const handleUpload = async () => {
    isUploading = true

    if (!title) {
      toast.push($t('uploadTap.requireTitle'), {
        theme: {
          '--toastBackground': '#ff595eaa',
        },
      })
      isUploading = false
      return
    }
    uploadImage()
  }

  const uploadImage = async () => {
    const {origin, thumbnail} = $resultBunny

    if (!origin || !thumbnail) return

    // 오리지널 이미지
    const originResult = await fetch(origin)
    const originBlob = await originResult.blob()
    const originFile = new File([originBlob], 'bunny.jpg', {type: originBlob.type})

    // 썸네일 이미지
    const thumbnailResult = await fetch(thumbnail)
    const thumbnailBlob = await thumbnailResult.blob()
    const thumbnailFile = new File([thumbnailBlob], 'bunny.jpg', {type: thumbnailBlob.type})

    const formData = new FormData()
    formData.append('image', originFile, originFile.name)
    formData.append('photo_title', title)
    formData.append('thumbnail', thumbnailFile, thumbnailFile.name)

    try {
      const result = await uploadPhoto(formData)
      if (result.photoId) {
        toast.push($t('uploadTap.uploaded'), {
          theme: {
            '--toastBackground': '#8ac926aa',
          },
        })
        push(`/detail/${result.photoId}`)
      }
    } catch (e) {
      if (e.response.data.message === '사진을 7개이상 추가할 수 없습니다.')
        toast.push($t('uploadTap.max'), {
          theme: {
            '--toastBackground': '#ff595eaa',
          },
        })
      else
        toast.push($t('uploadTap.error'), {
          theme: {
            '--toastBackground': '#ff595eaa',
          },
        })
    } finally {
      isUploading = false
    }
  }
</script>

<Layout title={$t('uploadTap.title')}>
  <div class="container">
    {#if $resultBunny?.origin}
      <span class="detail">{$t('uploadTap.title') + ' (｡･ω･｡)ﾉ♡'}</span>
    {:else}
      <span class="detail">{$t('uploadTap.upload')}</span>
    {/if}
    <img class={$resultBunny?.origin ? '' : 'default'} src={$resultBunny?.origin || defaultBunny} alt="데브진스" />
    <div class="toolbar">
      <Noti
        style="background-color: #fffcec;"
        icon="⚠️"
        text={$t('uploadTap.warn')}
      />
      <Noti icon="❤️" text={$t('uploadTap.addTitle')} />
      <div class="input-wrapper">
        <input placeholder={$t('uploadTap.placeholder') + "🐰"} class="title" type="text" bind:value={title} />

        <button disabled={isUploading} class="save" class:isUploading on:click={handleUpload}>
          {#if isUploading}
            <ScaleOut size="35" color="#1982c4" unit="px" duration="1s" />
          {:else}
            <span>{$t('uploadTap.submit')}</span>
          {/if}
        </button>
      </div>
    </div>
  </div>
</Layout>

<style>
  .detail {
    color: #666;
    margin-bottom: 10px;
  }
  .default {
    width: 100%;
    background-color: #dee2e6;
    opacity: 0.5;
    filter: grayscale(100%);
  }
  .toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
  }
  .title {
    width: 100%;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
    padding: 10px;
  }

  .input-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .save {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
    width: 100px;
    margin-left: 10px;
    background-color: #f1f3f6;
    max-height: 41px;
  }
  .isUploading {
    background-color: #fff;
  }
</style>
