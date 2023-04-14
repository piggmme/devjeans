<script lang="ts">
  import FemaleHanbok from './FemaleHanbok.svelte'
  import JacketClose from './JacketClose.svelte'
  import JacketOpen from './JacketOpen.svelte'
  import Pants from './Pants.svelte'
  import ShirtDress from './ShirtDress.svelte'
  import Shirts from './Shirts.svelte'
  import Shoes from './Shoes.svelte'
  import YShirts from './YShirts.svelte'
</script>

<div class="hidden">
  <JacketClose />
  <JacketOpen />
  <Pants />
  <Shirts />
  <Shoes />
  <FemaleHanbok />
  <ShirtDress />
  <!-- <YShirts /> -->
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
