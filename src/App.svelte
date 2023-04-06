<script lang="ts">
  import Router from 'svelte-spa-router'
  import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import {routes} from 'src/pages/routes'
  import {onMount} from 'svelte'
  import {initUser} from 'src/lib/initUser'
  import {datadogRum} from '@datadog/browser-rum'

  onMount(() => {
    if (import.meta.env.MODE === 'development') return
    datadogRum.init({
      applicationId: `${import.meta.env.VITE_APP_DATADOG_APP_ID}`,
      clientToken: `${import.meta.env.VITE_APP_DATADOG_CLIENT_TOKEN}`,
      site: `${import.meta.env.VITE_APP_DATADOG_SITE}`,
      service: `${import.meta.env.VITE_APP_DATADOG_SERVICE}`,

      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      premiumSampleRate: 100,
      trackUserInteractions: true,
      defaultPrivacyLevel: 'mask-user-input',
    })

    datadogRum.startSessionReplayRecording()
  })

  const queryClient = new QueryClient()
  onMount(initUser)
</script>

<QueryClientProvider client={queryClient}>
  <SvelteToast
    options={{
      reversed: true,
      intro: {y: 192},
      duration: 1500,
      dismissable: false,
      theme: {
        '--toastBarHeight': 0,
        '--toastBackground': '#1982c4aa',
        '--toastBarBackground': '#1982c4',
      },
    }}
  />
  <Router {routes} />
</QueryClientProvider>
