<script lang="ts">
  import {fabric} from 'fabric'
  import {t} from 'svelte-i18n'
  import ColorPicker from 'svelte-awesome-color-picker'
  import {background, backgroundImage, canvas} from 'src/store/canvas'
  import {onMount} from 'svelte'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'

  let inputImage: HTMLInputElement

  onMount(() => {
    logEvent(analytics, '배경 탭 진입')
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
    removeImage()
    const url = URL.createObjectURL(file)

    $backgroundImage = url

    fabric.Image.fromURL(url, function (img) {
      img.set('itemType', 'background')
      $canvas.setBackgroundImage(img, $canvas.renderAll.bind($canvas), {
        scaleX: $canvas.width / img.width,
        scaleY: $canvas.height / img.height,
      })
    })
  }

  const removeImage = () => {
    // 배경 이미지 제거
    $canvas.setBackgroundImage(null, $canvas.renderAll.bind($canvas))
  }
</script>

<div class="container">
  <h2>{$t('backgroundTap.title')}</h2>

  <ul>
    <li>
      <h3>{$t('backgroundTap.backgroundColor')}</h3>
      <ColorPicker bind:hex={$background} isA11yClosable={false} label={$t('backgroundTap.select')} />
    </li>

    <li>
      <h3>{$t('backgroundTap.backgroundImage')}</h3>

      <div class="buttonWrapper">
        <button
          on:click={() => {
            inputImage.click()
          }}>{$t('backgroundTap.select')}</button
        >
        <button on:click={removeImage}>{$t('backgroundTap.remove')}</button>
      </div>
    </li>
  </ul>
</div>

<input bind:this={inputImage} on:change={handleAddImage} type="file" accept="image/*" style="display: none" />

<style>
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
    word-break: keep-all;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    word-break: keep-all;
  }

  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  ul {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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

  .buttonWrapper {
    display: flex;
    flex-direction: raw;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>
