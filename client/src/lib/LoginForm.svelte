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
  import WelcomeScreen from "./WelcomeScreen.svelte";
  import {
    buildForm,
    hasNoInvalidChars,
    isNotEmpty,
  } from "../utils/validation";
  import HelperText from "@smui/textfield/helper-text";

  let open = false;
  let error = "";
  let submitted = false;

  const loginForm = buildForm<"username" | "password">({
    username: [isNotEmpty, hasNoInvalidChars],
    password: [isNotEmpty, hasNoInvalidChars],
  });

  const handleSubmit = async () => {
    submitted = true;

    if (!loginForm.validateForm()) {
      open = true;
      error = "Some fields require revision";
      return;
    }

    loader.set(true);

    const res = await Request<User>(HTTPmethods.POST, "/login", {
      username: $loginForm.username.value,
      password: $loginForm.password.value,
    });

    if (res.success) {
      Store.set({ username: res.username });
      view.set(AuthScreen);
    } else {
      open = true;
      error = res.error;
    }

    loader.set(false);
  };

  const handleCancel = () => view.set(WelcomeScreen);
</script>

<form class="spacing" on:submit|preventDefault={handleSubmit}>
  <Textfield
    type="text"
    name="username"
    style="width: 100%;"
    variant="outlined"
    bind:value={$loginForm.username.value}
    on:blur={loginForm.validateForm}
    on:input={loginForm.validateForm}
    label="User name"
    on:focus={() => ($loginForm.username.touched = true)}
    invalid={!$loginForm.username.isValid &&
      ($loginForm.username.touched || submitted)}
  >
    <HelperText class="mb" validationMsg slot="helper">
      {$loginForm.username.errors}
    </HelperText>
  </Textfield>

  <Textfield
    type="password"
    name="password"
    style="width: 100%;"
    variant="outlined"
    bind:value={$loginForm.password.value}
    on:blur={loginForm.validateForm}
    on:input={loginForm.validateForm}
    label="Password"
    on:focus={() => ($loginForm.password.touched = true)}
    invalid={!$loginForm.password.isValid &&
      ($loginForm.password.touched || submitted)}
  >
    <HelperText class="mb" validationMsg slot="helper">
      {$loginForm.password.errors}
    </HelperText>
  </Textfield>

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
