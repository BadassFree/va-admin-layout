# 简介

va-layout-admin 是一个由 Vue3 + TypeScript + Vite 集成的后台布局组件

# 使用教程

```bash
npm install -S va-layout-admin

or

yarn add va-layout-admin
```

# 快速上手

在 main.ts 中写入以下内容：

```typescript
// main.ts
import { createApp } from "vue";
import AdminLayout from "va-layout-admin";
import App from "./App.vue";

const app = createApp(App);

app.component("AdminLayout", AdminLayout);

app.mount("#app");
```

```html
<template>
  <admin-layout
    :mode="mode"
    :is-mobile="isMobile"
    :fixed-header-and-tab="fixedHeaderAndTab"
    :fixed-footer="fixedFooter"
    :sider-collapse="siderCollapse"
    :hide-header-and-sider="visibleHeaderAndSider"
    @update:sider-collapse="setSiderCollapse"
  >
    <template #header>
      <div class="flex-center h-full bg-#e6e6e6">Header</div>
    </template>
    <template #tab>
      <div class="flex-center h-full bg-#cccccc">Tab</div>
    </template>
    <template #sider>
      <div class="h-full bg-#d9d9d9">
        <div class="flex-center h-56px">Sider</div>
      </div>
    </template>
    <template #footer>
      <div class="flex-center h-full bg-#e6e6e6">Footer</div>
    </template>
    <div class="fixed right-0 top-120px px-12px whitespace-nowrap">
      <div>
        <h4>layout mode:</h4>
        <div v-for="item in modeList" :key="item">
          <span class="pr-8px">{{ item }}</span>
          <input
            type="radio"
            name="mode"
            :value="item"
            :checked="item === mode"
            class="cursor-pointer"
            @change="setMode(item)"
          />
        </div>
      </div>
      <div class="pt-24px">
        <span class="pr-8px">isMobile</span>
        <input type="checkbox" :checked="isMobile" @change="toggleIsMobile" />
      </div>
      <div class="pt-24px">
        <span class="pr-8px">fixedHeaderAndTab</span>
        <input
          type="checkbox"
          :checked="fixedHeaderAndTab"
          @change="toggleFixedHeaderAndTab"
        />
      </div>
      <div class="pt-24px">
        <span class="pr-8px">fixedFooter</span>
        <input
          type="checkbox"
          :checked="fixedFooter"
          @change="toggleFixedFooter"
        />
      </div>
      <div class="pt-24px">
        <span class="pr-8px">siderCollapse</span>
        <input
          type="checkbox"
          :checked="siderCollapse"
          @change="toggleSiderCollapse"
        />
      </div>
      <div class="pt-24px">
        <span class="pr-8px">hideHeaderAndSider</span>
        <input
          type="checkbox"
          :checked="visibleHeaderAndSider"
          @change="toggleHideHeaderAndSider"
        />
      </div>
    </div>
    <div v-for="i in 50" :key="i" class="text-center">{{ i }}</div>
  </admin-layout>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useBoolean } from "@/hooks";
  import AdminLayout from "./index";

  type Mode = "vertical" | "horizontal";
  const mode = ref<Mode>("vertical");
  const modeList: Mode[] = ["vertical", "horizontal"];
  function setMode(value: Mode) {
    mode.value = value;
  }

  const { bool: isMobile, toggle: toggleIsMobile } = useBoolean();
  const { bool: fixedHeaderAndTab, toggle: toggleFixedHeaderAndTab } =
    useBoolean(true);
  const { bool: fixedFooter, toggle: toggleFixedFooter } = useBoolean();
  const {
    bool: siderCollapse,
    setBool: setSiderCollapse,
    toggle: toggleSiderCollapse,
  } = useBoolean();
  const {
    bool: visibleHeaderAndSider,
    setBool: setHideHeaderAndSider,
    toggle: toggleHideHeaderAndSider,
  } = useBoolean();
</script>

<style></style>
```

# AdminLayout 属性

| 属性名                   | 说明                   | 类型                              | 默认值            |
| :----------------------- | :--------------------- | :-------------------------------- | :---------------- |
| mode                     | 布局模式               | string ('vertical', 'horizontal') | 'vertical'        |
| isMobile                 | 是否是移动端           | boolean                           | false             |
| maskBg                   | 移动端时遮罩背景颜色   | string                            | 'rgba(0,0,0,0.3)' |
| useMinWidthLayout        | 是否启用最小宽度的布局 | boolean                           | false             |
| minWidth                 | 最小宽度               | number                            | 1200              |
| headerVisible            | 头部可见               | boolean                           | true              |
| headerHeight             | 头部高度               | number                            | 56                |
| tabVisible               | 标签可见               | boolean                           | true              |
| tabHeight                | 标签页高度             | number                            | 44                |
| fixedHeaderAndTab        | 固定头部和标签         | boolean                           | true              |
| addMainOverflowHidden    | 给主体添加禁止溢出     | boolean                           | false             |
| footerVisible            | 底部可见               | boolean                           | true              |
| footerHeight             | 底部高度               | number                            | 48                |
| fixedFooter              | 固定底部               | boolean                           | true              |
| siderVisible             | 侧边可见               | boolean                           | true              |
| siderWidth               | 侧边栏高度             | number                            | 200               |
| siderCollapsedWidth      | 侧边栏折叠状态的高度   | number                            | 64                |
| siderCollapse            | 侧边栏折叠状态         | boolean                           | false             |
| transitionDuration       | 动画过渡时间           | number                            | 300               |
| transitionTimingFunction | 动画过渡速度曲线       | string                            | 'ease-in-out'     |
| hideHeaderAndSider       | 隐藏头部和侧边栏       | boolean                           | false             |

# AdminLayout 事件

| 属性名                | 说明             | 回调参数                     |
| :-------------------- | :--------------- | :--------------------------- |
| update:sider-collapse | 侧边栏伸缩时出发 | (collapse) collapse 伸缩属性 |
