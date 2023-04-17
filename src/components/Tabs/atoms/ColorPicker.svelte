<script lang="ts">
  import {t} from 'svelte-i18n'
  import 'vanilla-picker/dist/vanilla-picker.csp.css'
  import Picker from 'vanilla-picker'
  import {hasCostume, type CostumeKeys, canvas} from 'src/store/canvas'
  import {setCostumeColorable, type CostumeTitleKey} from 'src/store/costume'
  import {onMount} from 'svelte'
  import {debounce} from 'lodash'

  export let costume: CostumeTitleKey | string
  export let defaultColor: string
  export let activeCostume: CostumeKeys

  let pickerButton: HTMLButtonElement
  let picker: Picker
  let pickerColor: HTMLDivElement

  const initColorPicker = () => {
    if (!pickerColor) return
    pickerColor.style.backgroundColor = defaultColor
    picker = new Picker({
      parent: pickerButton,
      popup: 'bottom',
      editor: true,
      editorFormat: 'hex',
      color: defaultColor,
      onChange: debounce((color) => {
        pickerColor.style.backgroundColor = color.rgbaString
        if (!$canvas || !$hasCostume[activeCostume].isHas) return
        setCostumeColorable(activeCostume, {
          [costume]: color.hex,
        })
      }, 100),
    })
  }

  $: if (defaultColor) {
    initColorPicker()
  }

  onMount(initColorPicker)
</script>

<button
  type="button"
  bind:this={pickerButton}
  on:click={(e) => {
    picker.openHandler(e)
  }}
>
  <div class="pickerColor" bind:this={pickerColor} />
  {$t('decorateTap.' + costume + 'Select')}
</button>

<style>
  .pickerColor {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    margin-right: 8px;
    border: 1px solid #ccc;
  }
  button {
    display: flex;
    background-color: transparent;
    border: none;
    justify-content: center;
    align-items: center;
  }
</style>
