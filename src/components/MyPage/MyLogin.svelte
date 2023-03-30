<script lang="ts">
  import Login from '../Login.svelte'
  import Noti from '../Noti.svelte'

  $: isMobile = window.hasOwnProperty('ontouchstart')

  export let title = '마이페이지를 이용하려면 로그인하세요.'
</script>

<div class="container">
  <div class="wrapper">
    <h2>{title}</h2>

    {#if isMobile}
      <div class:isMobile>
        <span>아직 모바일에서는 로그인이 안돼요 ㅠㅠ</span>
        <span>데스크탑에서 로그인 해주세요!</span>
      </div>
    {/if}

    <Login />
  </div>
  <Noti style="margin: 30px 0;" icon="❤️" text="로그인 후 나만의 버니를 올려 자랑해 보세요!" />
</div>

<style>
  .container {
    width: 100%;
    padding: 10px;
  }
  .isMobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    margin-bottom: 20px;
    color: #ff595e;
  }
  .wrapper {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    padding-bottom: 20px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin: 20px 0;
    font-size: 18px;
  }
</style>
