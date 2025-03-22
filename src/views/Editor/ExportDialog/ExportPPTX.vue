<template>
  <div class="export-pptx-dialog">
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

      <div class="row">
        <div class="title">오디오/비디오 무시:</div>
        <div class="config-item">
          <Switch
            v-model:value="ignoreMedia"
            v-tooltip="'기본적으로 오디오 및 비디오는 내보내기에서 제외됩니다. 슬라이드에 멀티미디어 요소가 포함되어 있고 이를 PPTX에 포함하고자 한다면 이 옵션을 끄세요. 단, 내보내기 시간이 상당히 길어질 수 있습니다.'"
          />
        </div>
      </div>

      <div class="row">
        <div class="title">기본 마스터 덮어쓰기:</div>
        <div class="config-item">
          <Switch v-model:value="masterOverwrite" />
        </div>
      </div>

      <div class="tip" v-if="!ignoreMedia">
        💡 팁:  
        1. 지원되는 미디어 형식: avi, mp4, mov, wmv, mp3, wav  
        2. 크로스 도메인(외부 도메인) 미디어는 내보낼 수 없습니다.
      </div>
    </div>

    <div class="btns">
      <Button class="btn export" type="primary" @click="exportPPTX(selectedSlides, masterOverwrite, ignoreMedia)">PPTX 내보내기</Button>
      <Button class="btn close" @click="emit('close')">닫기</Button>
    </div>

    <FullscreenSpin :loading="exporting" tip="내보내는 중입니다..." />
  </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import useExport from '@/hooks/useExport'

import FullscreenSpin from '@/components/FullscreenSpin.vue'
import Switch from '@/components/Switch.vue'
import Slider from '@/components/Slider.vue'
import Button from '@/components/Button.vue'
import RadioButton from '@/components/RadioButton.vue'
import RadioGroup from '@/components/RadioGroup.vue'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const { slides, currentSlide } = storeToRefs(useSlidesStore())

const { exportPPTX, exporting } = useExport()

const rangeType = ref<'all' | 'current' | 'custom'>('all')
const range = ref<[number, number]>([1, slides.value.length])
const masterOverwrite = ref(true)
const ignoreMedia = ref(true)

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
.export-pptx-dialog {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.configs {
  width: 490px;
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
    width: 140px;
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
    margin-top: 10px;
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