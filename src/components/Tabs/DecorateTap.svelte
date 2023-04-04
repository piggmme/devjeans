<script lang="ts">
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
  import Costume from '../Costume/Costume.svelte'
  import {costumeColorable, CostumeTitle, setCostumeColorable, type CostumeColorableKey} from 'src/store/costume'
  import ColorPicker from 'svelte-awesome-color-picker'

  let activeCategory: CategoryKey = '커스텀 아이템'
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
</script>

{#if activeCategory === '커스텀 아이템'}
  <Costume />
{/if}

<div class="container">
  <h2>아이템을 추가해 꾸며 주세요!</h2>

  <!-- <ul class="categories">
    {#each categories as category}
      <button class="category" class:active={activeCategory === category} on:click={() => (activeCategory = category)}>
        {category}
      </button>
    {/each}
  </ul> -->

  <div class="categories">
    <label
      >카테고리
      <select class="select" bind:value={activeCategory}>
        {#each categories as category}
          <option value={category}>
            {category}
          </option>
        {/each}
      </select>
    </label>
  </div>

  {#if activeCategory !== '커스텀 아이템'}
    <ul class="toolbar">
      <li>
        <button class="item reset" on:click={reset}>초기화하기</button>
      </li>
      {#each categoryCostume[activeCategory] as costume}
        <li>
          <button class="item {$hasCostume[costume].isHas ? 'activeHas' : ''}" on:click={toggleActive(costume)}
            >{costumeInfo[costume].title}</button
          >
        </li>
      {/each}
    </ul>
  {/if}

  {#if activeCategory === '커스텀 아이템'}
    <div class="tabs">
      <ul class="toolbar">
        <li>
          <button class="item reset" on:click={reset}>초기화하기</button>
        </li>
        {#each categoryCostume[activeCategory] as costume}
          <li>
            <button
              class="item {$hasCostume[costume].isHas ? 'activeHas' : ''} {costume === activeCostume
                ? 'activeCostume'
                : ''}"
              on:click={() => clickCostume(costume)}>{costumeInfo[costume].title}</button
            >
          </li>
        {/each}
      </ul>

      <ul class="toolbar colorbar">
        {#if !activeCostume}
          없어요!
        {:else}
          <li>
            <button
              class="item {$hasCostume[activeCostume].isHas ? 'activeHas' : ''}"
              on:click={toggleActive(activeCostume)}
              >{costumeInfo[activeCostume].title} {$hasCostume[activeCostume].isHas ? '제거' : '추가'}</button
            >
          </li>
          {#each Object.entries($costumeColorable?.[activeCostume]) as costume}
            <li>
              <div class="picker">
                <ColorPicker
                  hex={costume[1]}
                  on:input={(e) => {
                    if (!$hasCostume[activeCostume].isHas) return
                    if (costume[1] === e.detail.hex) return
                    setCostumeColorable(activeCostume, {
                      [costume[0]]: e.detail.hex,
                    })
                  }}
                  isA11yClosable={false}
                  label={CostumeTitle[costume[0]] + ' 선택하기'}
                />
              </div>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  {/if}
</div>

<style>
  .categories {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .select {
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-left: 10px;
    border-radius: 5px;
  }
  /* .categories {
    width: 100%;
    display: flex;
  }
  .category {
    border-radius: 0;
    box-sizing: border-box;
    padding: 10px 16px;
    border: 1px solid #edf0f3;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
    border-right: none;
    border-radius: 10px 10px 0 0;
  }
  .category:last-child {
    border-right: 1px solid #edf0f3;
  }
  .category.active {
    background-color: #edf0f3;
  } */
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
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

  .tabs {
    width: 100%;
    display: flex;
    min-height: 200px;
  }

  .tabs > .toolbar:first-child {
    display: flex;
    justify-content: baseline;
  }
  .tabs > .toolbar:last-child {
    width: auto;
    padding: 0;
    min-width: 150px;
    border: 2px solid #edf0f3;
    border-radius: 10px;
    margin: 10px;
  }
  .colorbar {
    display: flex;
    flex-direction: column;
  }

  .item {
    box-sizing: border-box !important;
    padding: 10px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    font-size: 12px;
  }

  .reset {
    color: #fff;
    background-color: #ff595e;
    border: none;
  }
  .item.activeHas {
    color: #fff;
    border: 1px solid rgb(80, 234, 137);
    background-color: rgb(80, 234, 137);
  }
  .item.activeCostume {
    color: inherit;
    border: 2px solid #000;
  }
</style>
