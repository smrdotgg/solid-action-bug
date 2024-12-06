import {
  createAsync,
  useSubmission,
  type RouteDefinition,
} from "@solidjs/router";
import { Show } from "solid-js";
import { JSX } from "solid-js";
import { countAction } from "~/lib";

export default function Main({children}:{children?:JSX.Element}) {
  const sub = useSubmission(countAction);
  return (
    <main class="w-full p-4 space-y-2">
      <form method="post" action={countAction}>
        <input type="number" name="max" value={10} hidden class="bg-blue-100 text-black" />
        <button type="submit" class="bg-blue-100 p-2 text-xl font-bold"> count to 10</button>
      </form>
      <Show when={sub.result}>
        <h1>{sub.result!().content}</h1>
      </Show>
      {children}
    </main>
  );
}
