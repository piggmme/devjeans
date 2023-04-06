<script>
  import { t } from 'svelte-i18n'
  import {TabValue} from 'src/const/tab'
  import BackgroundTap from './Tabs/BackgroundTap.svelte'
  import Photo from './Tabs/Photo.svelte'
  import Decorate from './Tabs/DecorateTap.svelte'
  import SaveTap from './Tabs/SaveTap.svelte'
  import Tabs from './Tabs/Tabs.svelte'
  import DrawingTap from './Tabs/DrawingTap.svelte'

  let items = [
    {label: $t('toolbar.decorate'), value: TabValue.Decorate, component: Decorate},
    {label: $t('toolbar.background'), value: TabValue.Background, component: BackgroundTap},
    {label: $t('toolbar.photo'), value: TabValue.Photo, component: Photo},
    {label: $t('toolbar.drawing'), value: TabValue.Drawing, component: DrawingTap},
    {label: $t('toolbar.save'), value: TabValue.Save, component: SaveTap},
  ]
</script>

<div class="container">
  <Tabs {items} />
</div>

<style>
  .container {
    max-width: 600px;
    width: 100%;
    margin: 20px auto;
    font-size: 12px;
  }
</style>
