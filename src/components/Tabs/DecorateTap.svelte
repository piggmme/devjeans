<script lang="ts">
  import {fabric} from 'fabric'
  import {logEvent} from 'firebase/analytics'
  import {analytics} from 'src/api/firebase/firebase'
  import {onMount} from 'svelte'
  import {canvas, width, hasCostume, costumeInfo, toggleCostume, resetCostume, type CostumeKeys} from 'src/store/canvas'

  let activeCategory = '옷'

  const categories = ['옷', '모자', '신발', '기타']

  onMount(() => {
    logEvent(analytics, '꾸미기 탭 진입')
  })

  const toggleActive = (costume: string) => () => {
    toggleCostume(costume as CostumeKeys)
  }

  const reset = () => {
    logEvent(analytics, '초기화 버튼 클릭')
    resetCostume()
  }
</script>

<div class="container">
  <h2>아이템을 추가해 꾸며 주세요!</h2>

  <ul class="categories">
    {#each categories as category}
      <button class="category" class:active={activeCategory === category} on:click={() => (activeCategory = category)}>
        {category}
      </button>
    {/each}
  </ul>

  <ul class="toolbar">
    <li>
      <button class="item reset" on:click={reset}>초기화하기</button>
    </li>
    {#each Object.keys(costumeInfo) as costume}
      <li>
        <button class="item {$hasCostume[costume] ? 'active' : ''}" on:click={toggleActive(costume)}
          >{costumeInfo[costume].title}</button
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  .categories {
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
  }
  .category:last-child {
    border-right: 1px solid #edf0f3;
  }
  .category.active {
    background-color: #1982c4cc;
    color: #fff;
  }
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

  .item {
    box-sizing: border-box;
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

  .item.active {
    color: #fff;
    border: 1px solid rgb(80, 234, 137);
    background-color: rgb(80, 234, 137);
  }
</style>
