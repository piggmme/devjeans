<script lang="ts">
  import {t} from 'svelte-i18n'
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import {querystring, push} from 'svelte-spa-router'
  import {userInfo} from 'src/store/user'

  let title = $t('myPage.requireLogin')

  $: {
    const redirect = $querystring.split('=')[1]
    if (redirect === 'decorate') title = $t('common.requireLogin2')
  }

  $: if ($userInfo) push('/?redirect=logined')
</script>

<Layout title={$t('myPage.login')}>
  <MyLogin {title} />
</Layout>

<style>
</style>
