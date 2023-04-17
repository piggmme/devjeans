<script lang="ts">
  import {t} from 'svelte-i18n'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {
    hasCostume,
    costumeInfo,
    toggleCostume,
    resetCostume,
    type CostumeKeys,
    categories,
    categoryCostume,
    type CategoryKey,
  } from 'src/store/canvas'
  import {costumeColorable} from 'src/store/costume'
  import ColorPicker from './atoms/ColorPicker.svelte'

  let activeCategory: CategoryKey = 'basic'
  let activeCostume: CostumeKeys = 'shirts'

  const clickCostume = (costume: string) => {
    activeCostume = costume as CostumeKeys
  }

  const toggleActive = (costume: string) => () => {
    toggleCostume(costume as CostumeKeys)
  }

  const reset = () => {
    logEvent(analytics, '초기화 버튼 클릭')
    resetCostume(activeCategory)
  }

  const onClick = (currentCategory: string) => {
    activeCategory = currentCategory as CategoryKey
  }
</script>

<div class="container">
  <h2>{$t('decorateTap.title')}</h2>

  <div class="contents">
    <ul class="categories">
      {#each categories as category}
        <button class="category" class:active={activeCategory === category} on:click={onClick}>
          {$t('decorateTap.' + category)}
        </button>
      {/each}
    </ul>

    {#if activeCategory !== 'basic'}
      <ul class="toolbar">
        <li>
          <button class="item reset" on:click={reset}>{$t('decorateTap.reset')}</button>
        </li>
        {#each categoryCostume[activeCategory] as costume}
          <li>
            <button class="item {$hasCostume[costume].isHas ? 'activeHas' : ''}" on:click={toggleActive(costume)}
              >{$t('decorateTap.' + costumeInfo[costume].title)}</button
            >
          </li>
        {/each}
      </ul>
    {/if}

    {#if activeCategory === 'basic'}
      <div class="custom">
        <ul class="toolbar">
          <li>
            <button class="custom-item item reset" on:click={reset}>{$t('decorateTap.reset')}</button>
          </li>
          {#each categoryCostume[activeCategory] as costume}
            <li>
              <button
                class="custom-item item {costume === activeCostume ? 'activeCostume' : ''}"
                on:click={() => clickCostume(costume)}>{$t('decorateTap.' + costumeInfo[costume].title)}</button
              >
            </li>
          {/each}
        </ul>

        <ul class="toolbar colorbar">
          {#if !activeCostume}
            {$t('decorateTap.empty')}
          {:else}
            <li>
              <button
                class="item {$hasCostume[activeCostume].isHas ? 'activeHas' : ''}"
                on:click={toggleActive(activeCostume)}
                >{$t('decorateTap.' + costumeInfo[activeCostume].title)}
                {$hasCostume[activeCostume].isHas ? $t('decorateTap.remove') : $t('decorateTap.add')}</button
              >
            </li>
            {#each Object.entries($costumeColorable?.[activeCostume]) as costume}
              <li>
                <ColorPicker costume={costume[0]} defaultColor={costume[1]} {activeCostume} />
              </li>
            {/each}
          {/if}
        </ul>
      </div>
    {/if}
  </div>
</div>

<style>
  .contents {
    display: flex;
    border-top: 1px solid #edf0f3;
    width: 100%;
  }
  .categories {
    width: 100%;
    display: flex;
    flex-direction: column;
    width: 100px;
    border: 1px solid #edf0f3;
  }
  .category {
    border-radius: 0;
    box-sizing: border-box;
    padding: 10px 16px;
    border: none;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
    word-break: keep-all;
    border-right: none;
  }
  .category.active {
    background-color: #edf0f3;
  }
  h2 {
    font-size: 20px;
    word-break: keep-all;
    padding: 20px;
  }
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 20px;
  }

  .toolbar > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
  }

  .custom {
    width: 100%;
    display: flex;
    min-height: 200px;
  }
  .custom > .toolbar:first-child > li {
    margin: 0;
    width: 100%;
  }

  .custom > .toolbar:first-child {
    display: flex;
    width: 130px;
    padding: 0;
  }
  .colorbar {
    display: flex;
    flex-direction: column;
    border: 1px solid #edf0f3;
  }

  .item {
    box-sizing: border-box !important;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    font-size: 12px;
  }
  .custom-item {
    display: block;
    width: 100%;
    border-radius: 0;
  }

  .reset {
    color: #fff;
    border: 1px solid #ff595e;
    background-color: #ff595e;
    border: none;
  }
  .item.activeHas {
    color: #fff;
    border: 1px solid rgb(80, 234, 137);
    background-color: rgb(80, 234, 137);
  }

  .custom-item {
    border: none;
  }

  .item.activeCostume {
    color: inherit;
    background-color: #edf0f3;
    border: 1px solid #a5a8aa !important;
  }
</style>
