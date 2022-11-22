import { AxiosResponse } from "axios"
import { computed, onMounted, ref } from "vue"
import { http } from "./Http"

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>
export const useTags = (fetcher: Fetcher) => {
  const page = ref(0)
  const hasMore = ref(false)
  const tags = ref<Tag[]>([])
  const fetchTags = async () => {
    const response = await fetcher(page.value)
  }
  onMounted(fetchTags)
  return { page, hasMore, tags, fetchTags }
}
