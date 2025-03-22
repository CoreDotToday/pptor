<template>
  <template v-if="slides.length">
    <Screen v-if="screening" />
    <Editor v-else-if="_isPC" />
    <Mobile v-else />
  </template>
  <FullscreenSpin tip="데이터 초기화가 진행 중입니다. 잠시만 기다려주세요..." v-else  loading :mask="false" />
</template>



<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useScreenStore, useMainStore, useSnapshotStore, useSlidesStore } from '@/store'
import { LOCALSTORAGE_KEY_DISCARDED_DB } from '@/configs/storage'
import { deleteDiscardedDB } from '@/utils/database'
import { isPC } from '@/utils/common'
import type { Slide } from '@/types/slides'
import message from './utils/message'
import api from '@/services'

import Editor from './views/Editor/index.vue'
import Screen from './views/Screen/index.vue'
import Mobile from './views/Mobile/index.vue'
import FullscreenSpin from '@/components/FullscreenSpin.vue'

const _isPC = isPC()

const mainStore = useMainStore()
const slidesStore = useSlidesStore()
const snapshotStore = useSnapshotStore()
const { databaseId } = storeToRefs(mainStore)
const { slides } = storeToRefs(slidesStore)
const { screening } = storeToRefs(useScreenStore())

if (import.meta.env.MODE !== 'development') {
  window.onbeforeunload = () => false
}

onMounted(async () => {
  if (location.hostname === 'localhost') {
    message.error('로컬 개발 시 http://127.0.0.1:5173 에 접속해주세요. 그렇지 않으면 데이터 신뢰성을 보장할 수 없습니다.', { duration: 0, closable: true })
    api.getMockData('slides').then((slides: Slide[]) => {
      slidesStore.setSlides(slides)
    })
  }
  else {
    api.getFileData('slides').then((slides: Slide[]) => {
      slidesStore.setSlides(slides)
    })
  }

  await deleteDiscardedDB()
  snapshotStore.initSnapshotDatabase()
})

// 나중에 데이터베이스를 지우기 위해 앱이 로그오프할 때 인덱싱된 데이터베이스의 데이터베이스 ID를 localStorage에 기록합니다.
window.addEventListener('unload', () => {
  const discardedDB = localStorage.getItem(LOCALSTORAGE_KEY_DISCARDED_DB)
  const discardedDBList: string[] = discardedDB ? JSON.parse(discardedDB) : []

  discardedDBList.push(databaseId.value)

  const newDiscardedDB = JSON.stringify(discardedDBList)
  localStorage.setItem(LOCALSTORAGE_KEY_DISCARDED_DB, newDiscardedDB)
})
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>