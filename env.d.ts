/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.mdx' {
  import type { ComponentOptions } from 'vue'
  const frontmatter: Record<string, any>
  const MDXComponent: ComponentOptions
  export { frontmatter }
  export default MDXComponent
}
