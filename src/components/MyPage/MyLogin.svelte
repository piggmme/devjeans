<script lang="ts">
  import Login from '../Login.svelte'
  import Noti from '../Noti.svelte'
  import {t} from "svelte-i18n";

  export let title = $t('myPage.requireLogin')
</script>

<div class="container">
  <div class="wrapper">
    <h2>{title}</h2>
    <Login />
  </div>
  <Noti style="margin: 30px 0;" icon="❤️" text={$t('myPage.footer')} />
</div>

<style>
  .container {
    width: 100%;
    padding: 10px;
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
