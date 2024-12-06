import { action } from "@solidjs/router";
import { returnCountStream } from "./stream";
import { createSignal } from "solid-js";

export const countAction = action(async (formData: FormData) => {
  const max = Number(String(formData.get("max")));
  console.log(`Starting count action with max: ${max}`);

  const [state, setState] = createSignal({
    content: "",
    done: false,
    error: false,
  });

  (async () => {
    const reader = await returnCountStream(max).then((r) => r.getReader());

    try {
      while (true) {
        console.log("Attempting to read from stream...");
        const { done, value } = await reader.read();

        if (done) {
          console.log("Stream reading completed");
          break;
        }

        console.log(`Received value: ${value}`);
        setState({ ...state(), content: state().content + value });
      }
    } catch (e) {
      console.error("Error in count action:", e);
      setState({ ...state(), error: !!e });
    } finally {
      console.log("Finalizing stream");
      setState({ ...state(), done: true });
      reader.releaseLock();
    }
  })();

  console.log("Final state:", state());
  return state;
});
