import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return <Button onClick={() => alert("Hello world!")}>Click me to see an alert</Button>;
}
