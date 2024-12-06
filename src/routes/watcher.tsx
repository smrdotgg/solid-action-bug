import { useSubmission, useSubmissions } from "@solidjs/router";
import { createEffect, createSignal, JSX } from "solid-js";
import { countAction } from "~/lib";

export const WatcherComp = ({ children }: { children?: JSX.Element }) => {
  const submissions = useSubmissions(countAction);
  const [val, setVal] = createSignal("");

  createEffect(() => {
    const latestResult = submissions.at(-1)?.result;
    if (latestResult && latestResult().content !== val()) {
      setVal(latestResult().content);
    }
  });

  return (
    <div>
      <div class="bg-blue-300 p-2 ">
        <h1> Parent watcher comp.</h1>
        <code class="font-mono">I sit near the top of the component tree, listening for changes and displaying them below</code>
        <br />
        <code class="font-mono">You'll notice, if you start a long stream, and change pages to the "Other Page" above and come back, the UI will stop showing you the new numbers, but if you open your dev tools and view the console or the network tab, you'll see that the data is still coming in. It's just not being picked up by the Reactive system.</code>
        <p class="bg-black text-white py-10 text-center">
        {Boolean(val()) ? <div>{val()}</div>: <div>No stream data yet...</div>}
        </p>
      </div>
      <div class="h-1 w-screen bg-blue-900"></div>
      {children}
    </div>
  );
};
