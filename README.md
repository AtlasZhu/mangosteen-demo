# 这是一个 Vue 3+Typescript+Vite 的项目

## 编码规范

### ref

推荐使用

```tsx
const start = ref<Point>();
```

不推荐使用

```tsx
const start = ref<Point | null>(null);
```

前者相当于是使用 undefined , 而不是 null
