<script lang="ts">
  import Paper, { Title, Content } from "@smui/paper";
  import CircularProgress from "@smui/circular-progress";
  import type { SvelteComponent } from "svelte";
  import AuthScreen from "./lib/AuthScreen.svelte";
  import WelcomScreen from "./lib/WelcomeScreen.svelte";
  import Store from "./utils/userStore";
  import view from "./utils/view";
  import loader from "./utils/loader";

  Store.subscribe((store) => {
    Store.setStorage(store);
  });

  let View: typeof SvelteComponent;
  view.subscribe((v) => {
    View = v;
  });

  View = $Store.username ? AuthScreen : WelcomScreen;
</script>

<main>
  <div class="paper-container">
    <Paper color="default" elevation={4} class="content">
      <Title class="mb">Welcome, {$Store.username || "guest"}!</Title>
      <Content>
        <svelte:component this={View} />
      </Content>
      {#if $loader}
        <div class="loader">
          <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        </div>
      {/if}
    </Paper>
  </div>
</main>

<style>
  .paper-container {
    max-width: 580px;
    width: 100%;
    margin: auto;
    text-align: center;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
