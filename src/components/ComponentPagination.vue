<template>
  <ul v-if="!noLiSurround" :class="['pagination', containerClass]">
    <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a
        :class="pageLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click="selectFirstPage"
        @keyup.enter="selectFirstPage"
        v-html="firstButtonText"
      ></a>
    </li>

    <li
      v-if="!(firstPageSelected() && hidePrevNext) && pageCount > 5"
      :class="[prevClass, firstPageSelected() ? disabledClass : '']"
    >
      <a
        :class="{ 'pagination-prev-link': true, prevLinkClass }"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click="prevPage"
        @keyup.enter="prevPage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
            fill="currentColor"
          />
        </svg>

        <span v-if="!hideText">{{ prevText }}</span>
      </a>
    </li>

    <li
      v-for="page in pages"
      :class="[
        pageClass,
        page.selected ? activeClass : '',
        page.disabled ? disabledClass : '',
        page.breakView ? breakViewClass : '',
      ]"
    >
      <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0">
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
      <a
        v-else
        :class="pageLinkClass"
        tabindex="0"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >
        {{ page.content }}
      </a>
    </li>

    <li
      v-if="!(lastPageSelected() && hidePrevNext) && pageCount > 5"
      :class="[nextClass, lastPageSelected() ? disabledClass : '']"
    >
      <a
        :class="['pagination-next-link', nextLinkClass]"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click="nextPage"
        @keyup.enter="nextPage"
      >
        <span v-if="!hideText">{{ nextText }}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </li>

    <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
      <a
        :class="pageLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()"
        v-html="lastButtonText"
      />
    </li>
  </ul>

  <div v-else :class="containerClass">
    <a
      v-if="firstLastButton"
      :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="selectFirstPage"
      @keyup.enter="selectFirstPage"
      v-html="firstButtonText"
    ></a>
    <a
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="prevPage"
      @keyup.enter="prevPage"
      v-html="prevText"
    ></a>
    <template v-for="page in pages">
      <a
        v-if="page.breakView"
        :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']"
        tabindex="0"
      >
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a
        v-else-if="page.disabled"
        :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]"
        tabindex="0"
      >
        {{ page.content }}
      </a>
      <a
        v-else
        :class="[pageLinkClass, page.selected ? activeClass : '']"
        tabindex="0"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >
        {{ page.content }}
      </a>
    </template>
    <a
      v-if="!(lastPageSelected() && hidePrevNext)"
      :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="nextPage"
      @keyup.enter="nextPage"
      v-html="nextText"
    ></a>
    <a
      v-if="firstLastButton"
      :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click="selectLastPage"
      @keyup.enter="selectLastPage"
      v-html="lastButtonText"
    ></a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
interface PageItem {
  readonly index?: number
  readonly content?: number
  readonly selected?: boolean
  readonly disabled?: boolean
  readonly breakView?: boolean
}
const props = withDefaults(
  defineProps<{
    readonly value?: number
    readonly pageCount: number
    readonly forcePage?: number
    readonly clickHandler?: (val: number) => void
    readonly pageRange?: number
    readonly marginPages?: number
    readonly prevText?: string
    readonly nextText?: string
    readonly breakViewText?: string
    readonly containerClass?: string
    readonly pageClass?: string
    readonly pageLinkClass?: string
    readonly prevClass?: string
    readonly prevLinkClass?: string
    readonly nextClass?: string
    readonly nextLinkClass?: string
    readonly breakViewClass?: string
    readonly breakViewLinkClass?: string
    readonly activeClass?: string
    readonly disabledClass?: string
    readonly noLiSurround?: boolean
    readonly firstLastButton?: boolean
    readonly firstButtonText?: string
    readonly lastButtonText?: string
    readonly hidePrevNext?: boolean
    readonly hideText?: boolean
  }>(),
  {
    clickHandler: () => {},
    pageRange: 3,
    marginPages: 1,
    prevText: 'Prev',
    nextText: 'Next',
    breakViewText: '…',
    activeClass: 'active',
    disabledClass: 'disabled',
    noLiSurround: false,
    firstLastButton: false,
    firstButtonText: 'First',
    lastButtonText: 'Last',
    hidePrevNext: false,
    hideText: false,
  },
)

const emit = defineEmits<{
  (e: 'input', value: number): void
}>()

const innerValue = ref<number>(props.value ?? 1)

watch(
  () => props.forcePage,
  (newVal) => {
    if (newVal !== undefined && newVal !== selected.value) {
      innerValue.value = newVal
    }
  },
)

const selected = computed<number>({
  get: () => props.value ?? innerValue.value,
  set: (val: number) => {
    innerValue.value = val
  },
})

const handlePageSelected = (val: number) => {
  if (selected.value === val) return
  selected.value = val
  emit('input', val)
  props.clickHandler?.(val)
}

const prevPage = () => {
  if (selected.value <= 1) return
  handlePageSelected(selected.value - 1)
}

const nextPage = () => {
  if (selected.value >= props.pageCount) return
  handlePageSelected(selected.value + 1)
}

const firstPageSelected = () => selected.value === 1
const lastPageSelected = () => selected.value === props.pageCount || props.pageCount === 0

const selectFirstPage = () => {
  if (selected.value <= 1) return
  handlePageSelected(1)
}

const selectLastPage = () => {
  if (selected.value >= props.pageCount) return
  handlePageSelected(props.pageCount)
}

const pages = computed<Record<number, PageItem>>(() => {
  const createPage = (index: number): PageItem => ({
    index,
    content: index + 1,
    selected: index === selected.value - 1,
  })

  const createBreak = (): PageItem => ({
    breakView: true,
    disabled: true,
  })

  const range = props.pageRange
  const margin = props.marginPages
  const half = Math.floor(range / 2)

  if (props.pageCount <= range) {
    const entries = Array.from({ length: props.pageCount }, (_, i): readonly [number, PageItem] => [
      i,
      createPage(i),
    ])

    return Object.fromEntries(entries)
  }
  // eslint-disable-next-line functional/no-let
  let selectedRangeLow = Math.max(selected.value - 1 - half, 0)
  // eslint-disable-next-line functional/no-let
  let selectedRangeHigh = selectedRangeLow + range - 1

  if (selectedRangeHigh >= props.pageCount) {
    selectedRangeHigh = props.pageCount - 1
    selectedRangeLow = selectedRangeHigh - range + 1
  }

  const marginStart = Array.from({ length: margin }, (_, i): readonly [number, PageItem] => [
    i,
    createPage(i),
  ])

  const breakBefore =
    selectedRangeLow > margin ? [[selectedRangeLow - 1, createBreak()] as const] : []

  const selectedRange = Array.from(
    { length: selectedRangeHigh - selectedRangeLow + 1 },
    (_, i): readonly [number, PageItem] => {
      const pageIndex = selectedRangeLow + i
      return [pageIndex, createPage(pageIndex)]
    },
  )

  const breakAfter =
    selectedRangeHigh + 1 < props.pageCount - margin
      ? [[selectedRangeHigh + 1, createBreak()] as const]
      : []

  const marginEnd = Array.from({ length: margin }, (_, i): readonly [number, PageItem] => {
    const index = props.pageCount - margin + i
    return [index, createPage(index)]
  })

  const entries: ReadonlyArray<readonly [number, PageItem]> = [
    ...marginStart,
    ...breakBefore,
    ...selectedRange,
    ...breakAfter,
    ...marginEnd,
  ]

  return Object.fromEntries(entries)
})
</script>

<style scoped>
a {
  cursor: pointer;
}
.pagination {
  display: flex;
  column-gap: 8px;
  justify-content: center;
}
.pagination > li > a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--blue);
  font-size: 17px;
  font-weight: 500;
  line-height: 100%;
}
.pagination-prev-link,
.pagination-next-link {
  border: 1px solid var(--blue-lighten-1);
}
.pagination-prev-link {
  transform: rotate(-180deg);
}
.prev-item.disabled > .pagination-prev-link,
.next-item.disabled > .pagination-next-link {
  color: var(--blue);
  border: 1px solid var(--blue);
}
.page-item.active > a {
  background-color: var(--blue);
  color: var(--white);
}
</style>
