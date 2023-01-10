<script lang="ts">
  import Button, { Label } from "@smui/button";
  import view from "../utils/view";
  import LoginForm from "./LoginForm.svelte";

  const handleClick = () => view.set(LoginForm);
</script>

<div>
  <Button class="spacing" on:click={handleClick} variant="raised">
    <Label>Log in</Label>
  </Button>
</div>
