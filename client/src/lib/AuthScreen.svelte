<script lang="ts">
  import Button, { Label } from "@smui/button";
  import loader from "../utils/loader";
  import Request from "../utils/request";
  import { HTTPmethods, type User } from "../utils/types";
  import Store from "../utils/userStore";
  import view from "../utils/view";
  import WelcomeScreen from "./WelcomeScreen.svelte";

  const handleClick = async () => {
    loader.set(true);

    const res = await Request(HTTPmethods.POST, "/logout");

    if (res.success) {
      Store.set({ username: "" });
      view.set(WelcomeScreen);
    }
    loader.set(false);
  };
</script>

<div>
  <Button
    class="spacing"
    on:click={handleClick}
    variant="raised"
    disabled={$loader}
  >
    <Label>Log out</Label>
  </Button>
</div>
