<template>
  <div class="export-pdf-dialog">
    <div class="thumbnails-view">
      <div class="thumbnails" ref="pdfThumbnailsRef">
        <ThumbnailSlide 
          class="thumbnail" 
          :slide="currentSlide" 
          :size="1600" 
          v-if="rangeType === 'current'"
        />
        <template v-else>
          <ThumbnailSlide 
            class="thumbnail" 
            :class="{ 'break-page': (index + 1) % count === 0 }"
            v-for="(slide, index) in slides" 
            :key="slide.id" 
            :slide="slide" 
            :size="1600" 
          />
        </template>
      </div>
    </div>

    <div class="configs">
      <div class="row">
        <div class="title">내보내기 범위:</div>
        <RadioGroup
          class="config-item"
          v-model:value="rangeType"
        >
          <RadioButton style="width: 50%;" value="all">전체</RadioButton>
          <RadioButton style="width: 50%;" value="current">현재 슬라이드</RadioButton>
        </RadioGroup>
      </div>

      <div class="row">
        <div class="title">페이지당 슬라이드 수:</div>
        <Select 
          class="config-item"
          v-model:value="count"
          :options="[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
          ]"
        />
      </div>

      <div class="row">
        <div class="title">여백 추가:</div>
        <div class="config-item">
          <Switch v-model:value="padding" />
        </div>
      </div>

      <div class="tip">
        💡 팁: 인쇄 미리보기와 실제 스타일이 다를 경우, 인쇄 창에서 [배경 그래픽] 옵션을 체크해 주세요.
      </div>
    </div>

    <div class="btns">
      <Button class="btn export" type="primary" @click="expPDF()">인쇄 / PDF 내보내기</Button>
      <Button class="btn close" @click="emit('close')">닫기</Button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import { print } from '@/utils/print'

import ThumbnailSlide from '@/views/components/ThumbnailSlide/index.vue'
import Switch from '@/components/Switch.vue'
import Button from '@/components/Button.vue'
import RadioButton from '@/components/RadioButton.vue'
import RadioGroup from '@/components/RadioGroup.vue'
import Select from '@/components/Select.vue'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const { slides, currentSlide, viewportRatio } = storeToRefs(useSlidesStore())

const pdfThumbnailsRef = ref<HTMLElement>()
const rangeType = ref<'all' | 'current'>('all')
const count = ref(1)
const padding = ref(true)

const expPDF = () => {
  if (!pdfThumbnailsRef.value) return
  const pageSize = {
    width: 1600,
    height: rangeType.value === 'all' ? 1600 * viewportRatio.value * count.value : 1600 * viewportRatio.value,
    margin: padding.value ? 50 : 0,
  }
  print(pdfThumbnailsRef.value, pageSize)
}
</script>

<style lang="scss" scoped>
.export-pdf-dialog {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.thumbnails-view {
  @include absolute-0();

  &::after {
    content: '';
    background-color: #fff;
    @include absolute-0();
  }
}
.thumbnail {
  &.break-page {
    break-after: page;
  }
}
.configs {
  width: 400px;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;

  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }

  .title {
    width: 145px;
  }
  .config-item {
    flex: 1;
  }

  .tip {
    font-size: 12px;
    color: #aaa;
    line-height: 1.8;
    margin-top: 25px;
  }
}
.btns {
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .export {
    flex: 1;
  }
  .close {
    width: 100px;
    margin-left: 10px;
  }
}
</style>