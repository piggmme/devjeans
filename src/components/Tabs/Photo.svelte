<script lang="ts">
  import {fabric} from 'fabric'
  import {t} from 'svelte-i18n'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {background, canvas, width} from 'src/store/canvas'
  import {onDestroy, onMount} from 'svelte'

  let inputImage: HTMLInputElement
  let imageLength = 0
  let activeObjects: fabric.Object[] | null = null
  let hasActiveObject = false

  onMount(() => {
    logEvent(analytics, '사진 탭 진입')

    $canvas.on('selection:created', handleSelectionCreated)
    $canvas.on('selection:cleared', handleSelectionCleared)
  })

  onDestroy(() => {
    $canvas.off('selection:created', handleSelectionCreated)
    $canvas.off('selection:cleared', handleSelectionCleared)
  })

  $: if ($canvas) {
    $canvas.setBackgroundColor($background, () => {
      $canvas.requestRenderAll()
    })
  }

  const handleAddImage = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement
    },
  ) => {
    const files = e.currentTarget.files
    if (!files) return
    const file = files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    imageLength += 1

    fabric.Image.fromURL(url, function (img) {
      img.set({
        left: imageLength * 10,
        top: imageLength * 10,
      })
      img.set('itemType', 'photo')
      img.scaleToWidth($width / 6)
      $canvas.add(img)
      $canvas.setActiveObject(img)
    })

    $canvas.requestRenderAll()
  }

  const removeImage = () => {
    // 선택된 이미지가 여러개인 경우 전부 제거
    const activeObjects = $canvas.getActiveObjects()
    if (activeObjects) {
      activeObjects.forEach((obj) => {
        $canvas.remove(obj)
        imageLength -= 1
      })
      hasActiveObject = false
    }
    $canvas.discardActiveObject()
  }

  const handleSelectionCreated = (e: fabric.IEvent) => {
    activeObjects = $canvas.getActiveObjects()
    hasActiveObject = activeObjects.length > 0
  }

  const handleSelectionCleared = (e: fabric.IEvent) => {
    hasActiveObject = false
  }
</script>

<div class="container">
  <h2>{$t('photoTap.title')}</h2>

  <div class="detail">
    <p>{$t('photoTap.description1')}</p>
    <p>{$t('photoTap.description2')}</p>
  </div>

  <div class="photo-buttons">
    <button
      on:click={() => {
        inputImage.click()
      }}>{$t('photoTap.add')}</button
    >
    <button on:click={removeImage} class:hasActiveObject>{$t('photoTap.remove')}</button>
  </div>
  <input bind:this={inputImage} on:change={handleAddImage} type="file" accept="image/*" style="display: none" />
</div>

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    word-break: keep-all;
  }
  .detail {
    font-size: 12px;
    word-break: keep-all;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
    margin: 5px;
    font-size: 12px;
  }

  .photo-buttons {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .hasActiveObject {
    box-sizing: border-box;
    background-color: #ff595e;
    color: #fff;
    border: none;
  }
</style>
