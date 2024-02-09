<script lang="ts">
  import {locale, t} from 'svelte-i18n'
  import {width} from 'src/store/canvas'
  import Nav from './Nav.svelte'
  import {onMount} from 'svelte'

  export let title = ''

  $: isLocalhost = window.location.hostname === 'localhost'
  let currentLocale = localStorage.getItem('devJeansLocale') || 'ko-KR'

  onMount(() => {
    locale.set(currentLocale)
  })

  const handleLocaleChange = (e) => {
    localStorage.setItem('devJeansLocale', e.target.value)
    locale.set(e.target.value)
    currentLocale = e.target.value
  }
</script>

<!-- <Nav /> -->

<main style={`width: ${$width}`}>
  <div class="titleWrapper">
    <h1>{title}</h1>
    <select bind:value={currentLocale} on:change={handleLocaleChange}>
      <option value="en">English</option>
      <option value="ko-KR">한국어</option>
      <option value="ja">日本語</option>
    </select>
  </div>

  <slot />
</main>

<footer>
  <!-- <Noti icon="🥕" text="개발자에게 당근을 사주세요! (당근당근)" href="https://ice-americano.co.kr/page/dev-jeans" /> -->
  <span>
    Instagram: <a href="https://www.instagram.com/dev_hee/">@dev_hee</a>
  </span>
  <span>
    Blog: <a href="https://velog.io/@heelieben">@pigme</a>
  </span>
  {#if !isLocalhost}
    <a href="https://hits.sh/devjeans.dev-hee.com/"
      ><img
        alt="Hits"
        src="https://hits.sh/devjeans.dev-hee.com.svg?view=today-total&style=for-the-badge&color=f1c164&labelColor=284d8e"
      /></a
    >
  {/if}
</footer>

<style>
  .titleWrapper {
    position: relative;
    width: 100%;
  }
  .titleWrapper h1 {
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    color: #f1c164;
    text-shadow: 1px 1px #16345a, 3px 3px #284d8e, 5px 5px #4d8cbf, 7px 7px #5fa9d9;
    margin: 0;
    margin-bottom: 10px;
  }
  .titleWrapper select {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: 30px;
    border: none;
    text-align: center;
  }
  main,
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(56, 56, 56);
    max-width: 600px;
    width: 100%;
    margin: 10px auto;
  }

  footer {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    color: rgb(98, 98, 98);
    padding: 30px 10px;
    padding-bottom: 100px;
  }
  a {
    color: #0098fa;
    text-decoration: none;
  }

  span {
    font-weight: 800;
  }
</style>
