<script lang="ts">
  import {t} from 'svelte-i18n'
  import {createQuery} from '@tanstack/svelte-query'
  import defaultBunny from 'src/assets/default-bunny.png'
  import Layout from 'src/components/Layout/Layout.svelte'
  import MyLogin from 'src/components/MyPage/MyLogin.svelte'
  import Profile from 'src/components/MyPage/Profile.svelte'
  import {userInfo} from 'src/store/user'
  import Gallery from 'src/components/Photo/Gallery.svelte'
  import {getUserPhotos} from 'src/api/service/user'
  import {logout} from 'src/api/service/auth'

  $: query = createQuery({
    queryKey: ['myPhotos'],
    queryFn: getUserPhotos,
    enabled: !!$userInfo,
  })
</script>

<Layout title={$t('myPage.title')}>
  {#if !!$userInfo}
    <Profile />

    <div class="bunny-list">
      {#if !$query?.data?.length}
        <div class="no-bunny">
          <h2>{$t('myPage.empty')}</h2>
          <span>{$t('myPage.upload')}</span>
          <img src={defaultBunny} alt="버니" class="no-bunny-img" />
        </div>
      {:else}
        <div class="gallery">
          <Gallery photos={$query?.data} />
          <button type="button" on:click={logout} class="logout">{$t('myPage.logout')}</button>
        </div>
      {/if}
    </div>
  {:else}
    <MyLogin />
  {/if}
</Layout>

<style>
  .no-bunny {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: rgb(104, 104, 104);
  }
  .no-bunny-img {
    opacity: 0.4;
    width: 300px;
  }
  .gallery {
    width: 100%;
    padding: 0 10px;
  }

  .logout {
    background-color: transparent;
    width: 100%;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-radius: 6px;
    margin-top: 30px;
    color: rgb(104, 104, 104);
    cursor: pointer;
  }
</style>
