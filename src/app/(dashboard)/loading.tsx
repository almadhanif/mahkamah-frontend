import { Container, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Container
      fluid
      className="flex items-center justify-center h-screen"
    >
      <Loader size="md" type="bars" />
    </Container>
  );
}
