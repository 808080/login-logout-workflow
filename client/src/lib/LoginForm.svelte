<script lang="ts">
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";
  import loader from "../utils/loader";
  import Request from "../utils/request";
  import { HTTPmethods, type User } from "../utils/types";
  import Store from "../utils/userStore";
  import view from "../utils/view";
  import AuthScreen from "./AuthScreen.svelte";
  import WelcomScreen from "./WelcomScreen.svelte";

  let open = false;
  let error = "";
  let username = "";
  let password = "";
  let isValid = true;

  const handleBlur = () => {
    const reg = new RegExp(/^[^\\/,.^]+$/, "gm");

    if (!username.match(reg)) {
      isValid = false;
      return;
    }

    if (!password.match(reg)) {
      isValid = false;
      return;
    }

    isValid = true;
  };

  const handleSubmit = async () => {
    const values = {
      username,
      password,
    };

    if (!isValid) {
      open = true;
      error = "Fields must not contain ,.^\\/";
      return;
    }

    loader.set(true);

    const res = await Request<User>(HTTPmethods.POST, "/login", values);

    if (res.success) {
      Store.set({ username: res.username });
      view.set(AuthScreen);
    } else {
      open = true;
      error = res.error;
    }

    loader.set(false);
    return;
  };

  const handleCancel = () => view.set(WelcomScreen);
</script>

<form class="spacing" on:submit|preventDefault={handleSubmit}>
  <Textfield
    type="text"
    name="username"
    class="mb"
    style="width: 100%;"
    variant="outlined"
    bind:value={username}
    on:blur={handleBlur}
    label="User name"
    required
  />
  <Textfield
    type="password"
    name="password"
    class="mb"
    style="width: 100%;"
    variant="outlined"
    bind:value={password}
    on:blur={handleBlur}
    label="Password"
    required
  />

  <Button
    class="spacing-inline"
    type="submit"
    variant="unelevated"
    disabled={$loader}
  >
    <Label>Submit</Label>
  </Button>
  <Button
    class="spacing-inline"
    type="button"
    on:click={handleCancel}
    variant="outlined"
  >
    <Label>Cancel</Label>
  </Button>
</form>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <Title id="simple-title">Error</Title>
  <Content id="simple-content">{error}</Content>
  <Actions>
    <Button>
      <Label>Ok</Label>
    </Button>
  </Actions>
</Dialog>
