import Animals from "@pages/Animals";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/animals")({
  component: Animals,
});
