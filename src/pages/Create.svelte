<script lang="ts">
  import {t} from 'svelte-i18n'
  import devJeans from 'src/assets/dev-jeans.png'
  import {fabric} from 'fabric'
  import {onDestroy, onMount} from 'svelte'
  import Toolbar from 'src/components/Toolbar.svelte'
  import Best from 'src/components/Best/Best.svelte'
  import {
    canvas,
    width,
    background,
    savedCanvas,
    hasCostume,
    type CostumeKeys,
    removeCostume,
    addCostume,
    backgroundImage,
  } from 'src/store/canvas'
  import {activeTabValue} from 'src/store/tab'
  import {TabValue} from 'src/const/tab'
  import Layout from 'src/components/Layout/Layout.svelte'
  import {querystring} from 'svelte-spa-router'
  import {resultBunny} from 'src/store/resultBunny'
  import Costume from 'src/components/Costume/Costume.svelte'

  // 이미지/아이템/드로잉 위치 조정을 위해 소수점 8자리까지 표현
  fabric.Object.NUM_FRACTION_DIGITS = 8

  let initFinish = false

  const getWidth = () => {
    if (window.innerWidth < 600) return window.innerWidth
    return 600
  }

  const setSavedCanvas = () => {
    $canvas.loadFromJSON($savedCanvas, () => {
      $savedCanvas = null
      $canvas.renderAll()
    })
  }

  const initCanvas = () => {
    $canvas = new fabric.Canvas('canvas')
    $width = getWidth()

    $canvas.setWidth($width)
    $canvas.setHeight($width)

    $resultBunny = null

    if ($savedCanvas) {
      setSavedCanvas()
      initFinish = true
      return
    }

    fabric.Image.fromURL(
      devJeans,
      function (img) {
        img.scaleToWidth($width)
        img.scaleToWidth($width)
        img.selectable = false
        img.set('itemType', 'bunny')
        $canvas.add(img)
        $canvas.renderAll()
        initFinish = true
      },
      {crossOrigin: 'anonymous'},
    )
  }

  onDestroy(() => {
    // 캔버스 json으로 저장
    const json = $canvas.toDatalessJSON(['itemType', 'costume'])
    $savedCanvas = json
  })

  onMount(initCanvas)

  onMount(() => {
    scrollTo(0, 0)
  })

  $: isDisableCanvas = $activeTabValue !== TabValue.Photo && $activeTabValue !== TabValue.Drawing

  $: if (!isDisableCanvas) {
    $canvas.renderAll()
  }

  $: if ($canvas) {
    $canvas.setBackgroundColor($background, () => {
      $canvas.renderAll()
    })
    // 캔버스의 오브젝트를 순회하며 버니는 selectable = false, 사진은 selectable = true로 설정
    $canvas.getObjects().forEach((obj) => {
      if (obj.itemType === 'bunny' || obj.itemType === 'costume') {
        obj.selectable = false
      }
    })
  }

  $: if ($canvas && $activeTabValue) {
    const objects = $canvas.getObjects()
    $canvas.discardActiveObject()

    if ($activeTabValue === TabValue.Background) {
      const bunnyObjects = objects.filter((obj) => obj.itemType !== 'background')
      bunnyObjects.forEach((obj) => {
        obj.opacity = 0.5
      })
    } else {
      const bunnyObjects = objects.filter((obj) => obj.itemType !== 'background')
      bunnyObjects.forEach((obj) => {
        obj.opacity = 1
      })
    }
    $canvas.renderAll()
  }

  // 로그인페이지에서 리다이렉트 되었다면 저장탭으로 이동
  $: {
    const redirect = $querystring.split('=')[1]
    if (redirect === 'logined') {
      $activeTabValue = TabValue.Save
    }
  }

  // 아이템 추가 및 삭제
  $: if (initFinish && !$savedCanvas) {
    const objects = $canvas.getObjects()

    for (const costume in $hasCostume) {
      const hasObj = objects.find((obj) => obj.costume === costume)

      if (hasObj && !$hasCostume[costume].isHas) removeCostume(costume as CostumeKeys)
      if (!hasObj && $hasCostume[costume].isHas) addCostume(costume as CostumeKeys)
    }

    $canvas.getObjects().forEach((obj) => {
      if (obj.itemType === 'bunny' || obj.itemType === 'costume') {
        obj.selectable = false
      }
    })

    $canvas.setWidth($width)
    $canvas.setHeight($width)
    $canvas.renderAll()
  }
</script>

<Costume />

<Layout title={$t('main.title')}>
  <div class:isDisableCanvas>
    <canvas id="canvas" width="1500" height="1500" style="border:1px solid #ccc" />
  </div>
  <Toolbar />
  <Best />
</Layout>

<style>
  .isDisableCanvas {
    pointer-events: none;
    touch-action: none;
  }
</style>
