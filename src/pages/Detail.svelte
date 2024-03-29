<script lang="ts">
  import {t} from 'svelte-i18n'
  import Layout from 'src/components/Layout/Layout.svelte'
  import likeDefault from 'src/assets/icons/like_default.svg'
  import likeFilled from 'src/assets/icons/like_filled.svg'
  import {checkLikePhoto, deletePhoto, getPhoto, toggleLikePhoto} from 'src/api/service/photo'
  import {params, pop, replace} from 'svelte-spa-router'
  import {useQueryClient, createQuery, createMutation} from '@tanstack/svelte-query'
  import {userInfo} from 'src/store/user'
  import defaultBunny from 'src/assets/default-bunny.png'
  import formatDate from 'src/lib/formatDate'
  import {debounce} from 'lodash'
  import {toast} from '@zerodevx/svelte-toast'
  import {ScaleOut} from 'svelte-loading-spinners'

  $: photoQuery = createQuery({
    queryKey: ['photo', `${$params?.id}`],
    queryFn: () => getPhoto({id: $params?.id}),
    enabled: !!$params?.id,
    onError: () => {
      replace('/404')
    },
  })

  // TODO. 좋아요 낙관적 UI 적용
  $: likeQuery = createQuery({
    queryKey: ['photo', `${$params?.id}`, 'like'],
    queryFn: () => checkLikePhoto({photoId: $params?.id}),
    enabled: !!$params?.id && !!$userInfo,
  })

  $: isAuthor = $photoQuery?.data?.userDto.email ? $photoQuery?.data?.userDto.email === $userInfo?.email : false
  $: isLiked = $likeQuery?.data
  $: likeCount = $photoQuery?.data?.likeCount || 0

  $: creator = $photoQuery?.data?.userDto.email.split('@')[0]

  $: deleteLoading = false

  $: isLoaded = false

  const client = useQueryClient()

  // TODO. 삭제 되었습니다 토스트 띄우기
  const deleteMutation = createMutation(() => deletePhoto({id: $photoQuery?.data?.photoId}), {
    onSuccess: () => {
      toast.push($t('common.deleteBunny'))
      deleteLoading = false
      client.invalidateQueries(['bunny-list', 'ranked'])
      client.invalidateQueries(['bunny-list', 'latest'])
      client.invalidateQueries(['myPhotos'])
      replace('/bunny-list/ranked')
    },
  })

  const handleDeletePhoto = async () => {
    deleteLoading = true
    $deleteMutation.mutate()
  }

  const handleToggleLikePhoto = async () => {
    if (!$userInfo) {
      toast.push($t('common.requireLogin'), {
        theme: {
          '--toastBackground': '#ff595eaa',
        },
      })
      return
    }

    try {
      isLiked = !isLiked
      if (isLiked) likeCount += 1
      else likeCount -= 1

      await toggleLikePhoto({isLiked, id: $params?.id})
      await $photoQuery.refetch()
    } catch (e) {
      if (isLiked) likeCount -= 1
      else likeCount += 1
      isLiked = !isLiked
    }
  }
</script>

<Layout title={$t('detail.title')}>
  <div class="container">
    <div class="titleArea">
      <h2 class="title">{$photoQuery?.data?.photoTitle || $t('detail.placeholder')}</h2>
      <p class="creator">{creator ? `@${creator}` : ''}</p>

      {#if isAuthor}
        <button class="delete" type="button" on:click={handleDeletePhoto}>
          {#if deleteLoading}
            <ScaleOut size="35" color="#ff595e" unit="px" duration="1s" />
          {:else}
            {$t('detail.delete')}
          {/if}
        </button>
      {/if}
    </div>

    <img
      class={isLoaded ? '' : 'hidden'}
      src={$photoQuery?.data?.imageUrl}
      alt="버니"
      on:load={() => {
        isLoaded = true
      }}
    />
    <img class="default {isLoaded ? 'hidden' : ''}" src={defaultBunny} alt="버니" />

    <div class="description">
      <div class="like">
        <button class="likeButton" on:click={debounce(handleToggleLikePhoto, 300)}>
          <img src={isLiked ? likeFilled : likeDefault} alt={`좋아요 ${isLiked ? '눌림' : '눌리지 않음'}`} />
        </button>
        <p class="likes">{likeCount}</p>
      </div>
      <p class="created">{$photoQuery?.data?.createdDate ? formatDate($photoQuery?.data?.createdDate) : ''}</p>
    </div>
  </div>
</Layout>

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
  .container {
    width: 100%;
    background-color: #fff;
    border: 1px solid #dee2e6;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  }
  .titleArea {
    padding: 10px;
    text-align: left;
    color: #495057;
    border-radius: 10px 10px 0 0;
    position: relative;
  }
  .default {
    width: 100%;
    background-color: #dee2e6;
    opacity: 0.5;
    filter: grayscale(100%);
  }
  .title,
  .creator {
    display: inline-block;
  }
  .description {
    padding: 10px;
    color: #495057;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .like {
    display: flex;
    align-items: center;
  }
  button {
    border: none;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 20px;
    height: 100%;
    color: #ff595e;
  }
  .likes {
    font-size: 20px;
    padding-left: 5px;
    line-height: 24px;
  }
  .created {
    line-height: 24px;
  }
</style>
