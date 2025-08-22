<script setup lang="ts">
import Content, { frontmatter } from './components/test.mdx'
import Spotify from './components/Spotify.vue'
import ToggleTheme from './components/ToggleTheme.vue'
</script>

<template>
  <div
    className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative grid place-items-center"
  >
    <div
      className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)]"
    ></div>
    <a href="/" z-999 class="font-cursive text-accent-foreground text-4xl absolute top-4 left-4"
      >agh</a
    >
    <ToggleTheme z-999 />
    <div
      slide-enter
      id="container"
      class="sm:max-w-[322px] h-full pt-15 sm:pt-6 sm:h-[632px] w-full sm:border-2px border-border flex flex-col sm:grid place-items-center bg-background text-foreground p6 space-y-4 rounded-xl slide-enter-content"
    >
      <header class="grid place-items-center max-w-[274px]">
        <img src="./assets/ash.webp" alt="Ash" />
        <div class="flex items-center gap1">
          <h1 class="text-xl font-bold">{{ frontmatter.name }}</h1>
          <span i-ph-seal-check class="h[20px] w[20px] mt0.5"></span>
        </div>
        <h2 class="text-sm text-accent-foreground">{{ frontmatter.tagline }}</h2>
      </header>
      <ul class="flex gap4 max-w-[274px]">
        <li class="flex">
          <a
            href="https://bsky.app/profile/ashtonheald.me"
            class="group text-center btn-foreground w[42px] h[42px]"
            aria-label="View my Bluesky profile"
            title="Bluesky"
          >
            <span
              i-ph-butterfly
              color="primary"
              class="text-lg"
              group-hover="text-foreground"
              transition-all
              duration-200
              ease-out
            ></span>
          </a>
        </li>
        <li class="flex">
          <a
            href="https://github.com/AshtonHeald"
            class="group text-center btn-foreground w[42px] h[42px]"
            aria-label="View my GitHub profile"
            title="Github"
          >
            <span
              i-ph-github-logo
              color="primary"
              class="text-lg"
              group-hover="text-foreground"
              transition-all
              duration-200
              ease-out
            ></span>
          </a>
        </li>
        <li class="flex">
          <a
            href="https://www.linkedin.com/in/ashtonheald/"
            class="group text-center btn-foreground w[42px] h[42px]"
            aria-label="View my LinkedIn profile"
            title="LinkedIn"
          >
            <span
              i-ph-linkedin-logo
              color="primary"
              class="text-lg"
              group-hover="text-foreground"
              transition-all
              duration-200
              ease-out
            ></span>
          </a>
        </li>
        <li class="flex">
          <a
            href="mailto:hello@ashtonheald.me"
            class="group text-center btn-foreground p2 w[42px] h[42px]"
            aria-label="Send me an email"
            title="Email"
          >
            <span
              i-ph-envelope
              color="primary"
              class="text-lg"
              group-hover="text-foreground"
              transition-all
              duration-200
              ease-out
            ></span>
          </a>
        </li>
        <li class="flex">
          <a
            href="https://buymeacoffee.com/ashtonheald"
            class="group text-center btn-foreground w[42px] h[42px]"
            aria-label="Support what I do"
            title="Buy me a coffee"
          >
            <span
              i-ph-hand-heart
              color="primary"
              class="text-lg"
              group-hover="text-foreground"
              transition-all
              duration-200
              ease-out
            ></span>
          </a>
        </li>
      </ul>

      <div class="flex flex-col gap4 h-full w-full max-w-[274px]">
        <a href="https://ashthe.dev" class="group text-center btn-foreground p2">
          <span class="font-semibold">AshTheDev</span>
          <div class="text-xs op80">Developer Website</div>
        </a>

        <a href="https://cafe.ashtonheald.me" class="group text-center btn-foreground p2">
          <span class="font-semibold">Ash Café</span>
          <div class="text-xs op80">Personal Website</div>
        </a>

        <a href="https://start.ashthe.dev" class="group text-center btn-foreground p2">
          <span class="font-semibold">Hajimari Online</span>
          <div class="text-xs op80">Custom Start Page (w.i.p)</div>
        </a>
        <!--
          <a href="" class="group text-center btn-foreground p2">
            <span class="font-semibold"></span>
            <div class="text-xs op80">Home Library Tracker (App)</div>
          </a>
          -->
        <Spotify />
      </div>
    </div>
  </div>
</template>
