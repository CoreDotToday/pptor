<template>
  <div class="export-pptist-dialog">
    <div class="configs">
      <div class="row">
        <div class="title">내보내기 범위:</div>
        <RadioGroup
          class="config-item"
          v-model:value="rangeType"
        >
          <RadioButton style="width: 33.33%;" value="all">전체</RadioButton>
          <RadioButton style="width: 33.33%;" value="current">현재 슬라이드</RadioButton>
          <RadioButton style="width: 33.33%;" value="custom">사용자 지정</RadioButton>
        </RadioGroup>
      </div>

      <div class="row" v-if="rangeType === 'custom'">
        <div class="title" :data-range="`(${range[0]} ~ ${range[1]})`">사용자 지정 범위:</div>
        <Slider
          class="config-item"
          range
          :min="1"
          :max="slides.length"
          :step="1"
          v-model:value="range"
        />
      </div>

      <div class="tip">
        💡 팁: `.pptist`는 이 앱 전용 파일 형식으로, 내보낸 후 다시 불러올 수 있습니다.
      </div>
    </div>

    <div class="btns">
      <Button class="btn export" type="primary" @click="exportSpecificFile(selectedSlides)">.pptist 파일 내보내기</Button>
      <Button class="btn close" @click="emit('close')">닫기</Button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import useExport from '@/hooks/useExport'

import Slider from '@/components/Slider.vue'
import Button from '@/components/Button.vue'
import RadioButton from '@/components/RadioButton.vue'
import RadioGroup from '@/components/RadioGroup.vue'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const { slides, currentSlide } = storeToRefs(useSlidesStore())

const { exportSpecificFile } = useExport()

const rangeType = ref<'all' | 'current' | 'custom'>('all')
const range = ref<[number, number]>([1, slides.value.length])

const selectedSlides = computed(() => {
  if (rangeType.value === 'all') return slides.value
  if (rangeType.value === 'current') return [currentSlide.value]
  return slides.value.filter((item, index) => {
    const [min, max] = range.value
    return index >= min - 1 && index <= max - 1
  })
})
</script>

<style lang="scss" scoped>
.export-pptist-dialog {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.configs {
  width: 450px;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }

  .title {
    width: 100px;
    position: relative;

    &::after {
      content: attr(data-range);
      position: absolute;
      top: 20px;
      left: 0;
    }
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

  .export {
    flex: 1;
  }
  .close {
    width: 100px;
    margin-left: 10px;
  }
}
</style>