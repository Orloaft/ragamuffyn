// login.tsx (a new route for login)
import { useActionData, Form } from "@remix-run/react";
import { login } from "../utils/auth"; // a function to check credentials
import { commitSession, getSession } from "~/utils/session.server";
import { redirect } from "@remix-run/node";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let username = formData.get("username");
  let password = formData.get("password");
  let user = await login(username, password);
  if (user) {
    let session = await getSession(request.headers.get("Cookie"));
    session.set("role", user); // Set role based on the login function's return value

    return redirect(`/dashboard/${user}`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    // Handle login failure
    // ...
  }
};
export default function Login() {
  let actionData = useActionData();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
    >
      <Box
        background={"black"}
        border={"1px #dddddd solid"}
        color={"#dddddd"}
        padding={"1rem"}
      >
        <Form method="post">
          <Flex direction={"column"}>
            <Box>
              <Text>Username:</Text>
              <Input type="text" id="username" name="username" required />
            </Box>
            <Box>
              <Text>Password:</Text>
              <Input type="password" id="password" name="password" required />
            </Box>
            <Button type="submit" colorScheme={"blue"}>
              Login
            </Button>
            {actionData?.error && <p>{actionData.error}</p>}
          </Flex>
        </Form>
      </Box>
    </Box>
  );
}
