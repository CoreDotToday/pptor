<template>
  <div class="editor-header">
    <div class="left">
      <Popover trigger="click" placement="bottom-start" v-model:value="mainMenuVisible">
        <template #content>
          <PopoverMenuItem @click="openAIPPTDialog(); mainMenuVisible = false">AI로 PPT 생성</PopoverMenuItem>
          
          <FileInput accept="application/vnd.openxmlformats-officedocument.presentationml.presentation" @change="files => {
            importPPTXFile(files)
            mainMenuVisible = false
          }">
            <PopoverMenuItem>PPTX 파일 가져오기 (테스트 버전)</PopoverMenuItem>
          </FileInput>

          <FileInput accept=".pptist" @change="files => {
            importSpecificFile(files)
            mainMenuVisible = false
          }">
            <PopoverMenuItem>.pptist 파일 가져오기</PopoverMenuItem>
          </FileInput>

          <PopoverMenuItem @click="setDialogForExport('pptx')">파일 내보내기</PopoverMenuItem>
          <PopoverMenuItem @click="resetSlides(); mainMenuVisible = false">슬라이드 초기화</PopoverMenuItem>
          <PopoverMenuItem @click="openMarkupPanel(); mainMenuVisible = false">슬라이드 유형 태깅</PopoverMenuItem>
          <PopoverMenuItem @click="mainMenuVisible = false; hotkeyDrawerVisible = true">단축키 모음</PopoverMenuItem>
        </template>
        <div class="menu-item"><IconHamburgerButton class="icon" /></div>
      </Popover>

      <div class="title">
        <Input 
          class="title-input" 
          ref="titleInputRef"
          v-model:value="titleValue" 
          @blur="handleUpdateTitle()" 
          v-if="editingTitle" 
        ></Input>
        <div 
          class="title-text"
          @click="startEditTitle()"
          :title="title"
          v-else
        >{{ title }}</div>
      </div>
    </div>

    <div class="right">
      <div class="group-menu-item">
        <div class="menu-item" v-tooltip="'슬라이드 쇼 시작 (F5)'" @click="enterScreening()">
          <IconPpt class="icon" />
        </div>
        <Popover trigger="click" center>
          <template #content>
            <PopoverMenuItem @click="enterScreeningFromStart()">처음부터 시작</PopoverMenuItem>
            <PopoverMenuItem @click="enterScreening()">현재 슬라이드부터 시작</PopoverMenuItem>
          </template>
          <div class="arrow-btn"><IconDown class="arrow" /></div>
        </Popover>
      </div>

      <div class="menu-item" v-tooltip="'AI로 PPT 생성'" @click="openAIPPTDialog(); mainMenuVisible = false">
        <span class="text ai">AI</span>
      </div>

      <div class="menu-item" v-tooltip="'내보내기'" @click="setDialogForExport('pptx')">
        <IconDownload class="icon" />
      </div>

      <a
        class="github-link"
        v-tooltip="'Core.Today 바로가기'"
        href="https://core.today"
        target="_blank"
      >
        <div class="menu-item">
          <img src="/icons/symbol.svg" class="icon" alt="Core.Today Logo" />
        </div>
      </a>
    </div>

    <Drawer
      :width="320"
      v-model:visible="hotkeyDrawerVisible"
      placement="right"
    >
      <HotkeyDoc />
      <template v-slot:title>단축키 모음</template>
    </Drawer>

    <FullscreenSpin :loading="exporting" tip="가져오는 중입니다..." />
  </div>
</template>


<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore, useSlidesStore } from '@/store'
import useScreening from '@/hooks/useScreening'
import useImport from '@/hooks/useImport'
import useSlideHandler from '@/hooks/useSlideHandler'
import type { DialogForExportTypes } from '@/types/export'

import HotkeyDoc from './HotkeyDoc.vue'
import FileInput from '@/components/FileInput.vue'
import FullscreenSpin from '@/components/FullscreenSpin.vue'
import Drawer from '@/components/Drawer.vue'
import Input from '@/components/Input.vue'
import Popover from '@/components/Popover.vue'
import PopoverMenuItem from '@/components/PopoverMenuItem.vue'

const mainStore = useMainStore()
const slidesStore = useSlidesStore()
const { title } = storeToRefs(slidesStore)
const { enterScreening, enterScreeningFromStart } = useScreening()
const { importSpecificFile, importPPTXFile, exporting } = useImport()
const { resetSlides } = useSlideHandler()

const mainMenuVisible = ref(false)
const hotkeyDrawerVisible = ref(false)
const editingTitle = ref(false)
const titleInputRef = ref<InstanceType<typeof Input>>()
const titleValue = ref('')

const startEditTitle = () => {
  titleValue.value = title.value
  editingTitle.value = true
  nextTick(() => titleInputRef.value?.focus())
}

const handleUpdateTitle = () => {
  slidesStore.setTitle(titleValue.value)
  editingTitle.value = false
}

const goLink = (url: string) => {
  window.open(url)
  mainMenuVisible.value = false
}

const setDialogForExport = (type: DialogForExportTypes) => {
  mainStore.setDialogForExport(type)
  mainMenuVisible.value = false
}

const openMarkupPanel = () => {
  mainStore.setMarkupPanelState(true)
}

const openAIPPTDialog = () => {
  mainStore.setAIPPTDialogState(true)
}
</script>

<style lang="scss" scoped>
.editor-header {
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid $borderColor;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}
.left, .right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  border-radius: $borderRadius;
  cursor: pointer;

  .icon {
    font-size: 18px;
    color: #666;
    
    &[src*="symbol.svg"] {  /* symbol.svg 파일에만 적용되는 스타일 */
      width: 20px;
      height: 20px;
    }
  }
  .text {
    width: 18px;
    text-align: center;
    font-size: 17px;
  }
  .ai {
    background: linear-gradient(270deg, #d897fd, #33bcfc);
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }

  &:hover {
    background-color: #f1f1f1;
  }
}
.group-menu-item {
  height: 30px;
  display: flex;
  margin: 0 8px;
  padding: 0 2px;
  border-radius: $borderRadius;

  &:hover {
    background-color: #f1f1f1;
  }

  .menu-item {
    padding: 0 3px;
  }
  .arrow-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.title {
  height: 30px;
  margin-left: 2px;
  font-size: 13px;

  .title-input {
    width: 200px;
    height: 100%;
    padding-left: 0;
    padding-right: 0;

    ::v-deep(input) {
      height: 28px;
      line-height: 28px;
    }
  }
  .title-text {
    min-width: 20px;
    max-width: 400px;
    line-height: 30px;
    padding: 0 6px;
    border-radius: $borderRadius;
    cursor: pointer;

    @include ellipsis-oneline();

    &:hover {
      background-color: #f1f1f1;
    }
  }
}
.github-link {
  display: inline-block;
  height: 30px;
}
</style>