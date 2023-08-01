export const infiniteScroll = ({fetch, element}: {fetch: () => Promise<any>; element: HTMLElement}) => {
  if (element) {
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0]
        if (first.isIntersecting) {
          await fetch()
        }
      },
      {threshold: 1},
    )
    observer.observe(element) //Element of DOM
  }
}
