<script lang="ts">
  import {isReadyCostume} from 'src/store/canvas'
  import {onMount} from 'svelte'
  import JacketClose from './JacketClose.svelte'
  import JacketOpen from './JacketOpen.svelte'
  import Pants from './Pants.svelte'
  import Shirts from './Shirts.svelte'
  import Shoes from './Shoes.svelte'

  onMount(() => {
    $isReadyCostume = true
  })
</script>

<div class="hidden">
  <JacketClose />
  <JacketOpen />
  <Pants />
  <Shirts />
  <Shoes />
</div>

<style>
  .hidden {
    overflow: hidden;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    clip-path: circle(0);
    width: 1px;
    height: 1px;
    margin: -1px;
    white-space: nowrap;
  }
</style>
