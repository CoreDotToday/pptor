import type { TurningMode } from '@/types/slides'

export const ANIMATION_DEFAULT_DURATION = 1000
export const ANIMATION_DEFAULT_TRIGGER = 'click'
export const ANIMATION_CLASS_PREFIX = 'animate__'
export const ENTER_ANIMATIONS = [
  {
    type: 'bounce',
    name: '튕김',
    children: [
      { name: '튕기며 들어오기', value: 'bounceIn' },
      { name: '오른쪽에서 튕기며', value: 'bounceInLeft' },
      { name: '왼쪽에서 튕기며', value: 'bounceInRight' },
      { name: '위쪽에서 튕기며', value: 'bounceInUp' },
      { name: '아래쪽에서 튕기며', value: 'bounceInDown' },
    ],
  },
  {
    type: 'fade',
    name: '페이드 인',
    children: [
      { name: '서서히 나타나기', value: 'fadeIn' },
      { name: '아래쪽에서 나타나기', value: 'fadeInDown' },
      { name: '멀리 아래에서 나타나기', value: 'fadeInDownBig' },
      { name: '왼쪽에서 나타나기', value: 'fadeInLeft' },
      { name: '멀리 왼쪽에서 나타나기', value: 'fadeInLeftBig' },
      { name: '오른쪽에서 나타나기', value: 'fadeInRight' },
      { name: '멀리 오른쪽에서 나타나기', value: 'fadeInRightBig' },
      { name: '위쪽에서 나타나기', value: 'fadeInUp' },
      { name: '멀리 위쪽에서 나타나기', value: 'fadeInUpBig' },
      { name: '좌상단에서 나타나기', value: 'fadeInTopLeft' },
      { name: '우상단에서 나타나기', value: 'fadeInTopRight' },
      { name: '좌하단에서 나타나기', value: 'fadeInBottomLeft' },
      { name: '우하단에서 나타나기', value: 'fadeInBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: '회전',
    children: [
      { name: '회전하며 들어오기', value: 'rotateIn' },
      { name: '좌하단 기준 회전', value: 'rotateInDownLeft' },
      { name: '우하단 기준 회전', value: 'rotateInDownRight' },
      { name: '좌상단 기준 회전', value: 'rotateInUpLeft' },
      { name: '우상단 기준 회전', value: 'rotateInUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: '확대',
    children: [
      { name: '확대하며 들어오기', value: 'zoomIn' },
      { name: '아래에서 확대', value: 'zoomInDown' },
      { name: '왼쪽에서 확대', value: 'zoomInLeft' },
      { name: '오른쪽에서 확대', value: 'zoomInRight' },
      { name: '위에서 확대', value: 'zoomInUp' },
    ],
  },
  {
    type: 'slide',
    name: '슬라이드 인',
    children: [
      { name: '아래로 슬라이드', value: 'slideInDown' },
      { name: '왼쪽에서 슬라이드', value: 'slideInLeft' },
      { name: '오른쪽에서 슬라이드', value: 'slideInRight' },
      { name: '위로 슬라이드', value: 'slideInUp' },
    ],
  },
  {
    type: 'flip',
    name: '뒤집기',
    children: [
      { name: 'X축 뒤집기', value: 'flipInX' },
      { name: 'Y축 뒤집기', value: 'flipInY' },
    ],
  },
  {
    type: 'back',
    name: '확대 슬라이드 인',
    children: [
      { name: '아래에서 확대 슬라이드', value: 'backInDown' },
      { name: '왼쪽에서 확대 슬라이드', value: 'backInLeft' },
      { name: '오른쪽에서 확대 슬라이드', value: 'backInRight' },
      { name: '위에서 확대 슬라이드', value: 'backInUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: '비행',
    children: [
      { name: '오른쪽에서 비행', value: 'lightSpeedInRight' },
      { name: '왼쪽에서 비행', value: 'lightSpeedInLeft' },
    ],
  },
]

export const EXIT_ANIMATIONS = [
  {
    type: 'bounce',
    name: '튕김',
    children: [
      { name: '튕기며 나가기', value: 'bounceOut' },
      { name: '왼쪽으로 튕기며', value: 'bounceOutLeft' },
      { name: '오른쪽으로 튕기며', value: 'bounceOutRight' },
      { name: '위로 튕기며', value: 'bounceOutUp' },
      { name: '아래로 튕기며', value: 'bounceOutDown' },
    ],
  },
  {
    type: 'fade',
    name: '페이드 아웃',
    children: [
      { name: '서서히 사라지기', value: 'fadeOut' },
      { name: '아래로 사라지기', value: 'fadeOutDown' },
      { name: '멀리 아래로 사라지기', value: 'fadeOutDownBig' },
      { name: '왼쪽으로 사라지기', value: 'fadeOutLeft' },
      { name: '멀리 왼쪽으로 사라지기', value: 'fadeOutLeftBig' },
      { name: '오른쪽으로 사라지기', value: 'fadeOutRight' },
      { name: '멀리 오른쪽으로 사라지기', value: 'fadeOutRightBig' },
      { name: '위로 사라지기', value: 'fadeOutUp' },
      { name: '멀리 위로 사라지기', value: 'fadeOutUpBig' },
      { name: '좌상단으로 사라지기', value: 'fadeOutTopLeft' },
      { name: '우상단으로 사라지기', value: 'fadeOutTopRight' },
      { name: '좌하단으로 사라지기', value: 'fadeOutBottomLeft' },
      { name: '우하단으로 사라지기', value: 'fadeOutBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: '회전',
    children: [
      { name: '회전하며 나가기', value: 'rotateOut' },
      { name: '좌하단 기준 회전', value: 'rotateOutDownLeft' },
      { name: '우하단 기준 회전', value: 'rotateOutDownRight' },
      { name: '좌상단 기준 회전', value: 'rotateOutUpLeft' },
      { name: '우상단 기준 회전', value: 'rotateOutUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: '축소',
    children: [
      { name: '축소하며 나가기', value: 'zoomOut' },
      { name: '아래로 축소', value: 'zoomOutDown' },
      { name: '왼쪽으로 축소', value: 'zoomOutLeft' },
      { name: '오른쪽으로 축소', value: 'zoomOutRight' },
      { name: '위로 축소', value: 'zoomOutUp' },
    ],
  },
  {
    type: 'slide',
    name: '슬라이드 아웃',
    children: [
      { name: '아래로 슬라이드', value: 'slideOutDown' },
      { name: '왼쪽으로 슬라이드', value: 'slideOutLeft' },
      { name: '오른쪽으로 슬라이드', value: 'slideOutRight' },
      { name: '위로 슬라이드', value: 'slideOutUp' },
    ],
  },
  {
    type: 'flip',
    name: '뒤집기',
    children: [
      { name: 'X축 뒤집기 나가기', value: 'flipOutX' },
      { name: 'Y축 뒤집기 나가기', value: 'flipOutY' },
    ],
  },
  {
    type: 'back',
    name: '축소 슬라이드 아웃',
    children: [
      { name: '아래로 축소 슬라이드', value: 'backOutDown' },
      { name: '왼쪽으로 축소 슬라이드', value: 'backOutLeft' },
      { name: '오른쪽으로 축소 슬라이드', value: 'backOutRight' },
      { name: '위로 축소 슬라이드', value: 'backOutUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: '비행',
    children: [
      { name: '오른쪽으로 비행', value: 'lightSpeedOutRight' },
      { name: '왼쪽으로 비행', value: 'lightSpeedOutLeft' },
    ],
  },
]

export const ATTENTION_ANIMATIONS = [
  {
    type: 'shake',
    name: '흔들림',
    children: [
      { name: '좌우 흔들기', value: 'shakeX' },
      { name: '상하 흔들기', value: 'shakeY' },
      { name: '고개 흔들기', value: 'headShake' },
      { name: '앞뒤 흔들기', value: 'swing' },
      { name: '요동치기', value: 'wobble' },
      { name: '깜짝 놀람', value: 'tada' },
      { name: '젤리처럼 흔들기', value: 'jello' },
    ],
  },
  {
    type: 'other',
    name: '기타',
    children: [
      { name: '튀기기', value: 'bounce' },
      { name: '깜박임', value: 'flash' },
      { name: '맥박 효과', value: 'pulse' },
      { name: '고무밴드', value: 'rubberBand' },
      { name: '심장 박동 (빠름)', value: 'heartBeat' },
    ],
  },
]

interface SlideAnimation {
  label: string
  value: TurningMode
}

export const SLIDE_ANIMATIONS: SlideAnimation[] = [
  { label: '없음', value: 'no' },
  { label: '무작위', value: 'random' },
  { label: '좌우 밀기', value: 'slideX' },
  { label: '상하 밀기', value: 'slideY' },
  { label: '좌우 밀기 (3D)', value: 'slideX3D' },
  { label: '상하 밀기 (3D)', value: 'slideY3D' },
  { label: '페이드 인/아웃', value: 'fade' },
  { label: '회전', value: 'rotate' },
  { label: '상하 확장', value: 'scaleY' },
  { label: '좌우 확장', value: 'scaleX' },
  { label: '확대', value: 'scale' },
  { label: '축소', value: 'scaleReverse' },
]
