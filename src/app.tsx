// @refresh reload
import { A, HashRouter, MemoryRouter, Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, Show, Suspense } from "solid-js";
import "./app.css";
import Main from "./routes/main";
import { WatcherComp } from "./routes/watcher";

const [useCustomRouter, setUseCustomRouter] = createSignal(0);
export default function App() {
  return (
    <Show when={!useCustomRouter()} fallback={<CustomRouter />}>
      <Router
        root={(props) => (
          <>
            <div class="flex justify-between">
              <div class="flex">
                <A href="/">Index</A>
                <A href="/demo">Other page</A>
              </div>
            <div class="text-3xl">
              STANDARD ROUTER 
            </div>
              <button onClick={() => setUseCustomRouter(1)}>
                Flip to custom router
              </button>
            </div>
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <Route path="/" component={WatcherComp}>
          <Route path="" component={Main} />
          <Route
            path="demo"
            component={() => (
              <div class="text-5xl text-blue-600">
                <h1>demo page</h1>
              </div>
            )}
          />
        </Route>

        {/* <FileRoutes /> */}
      </Router>
    </Show>
  );
}

function CustomRouter() {
  const [route, setRoute] = createSignal(0);
  return (
    <MemoryRouter
      root={(props) => (
        <>
          <div class="flex justify-between">
            <div class="flex gap-3">
              <button onClick={() => setRoute(0)}>Index</button>
              <button onClick={() => setRoute(1)}>Other page</button>
            </div>
            <div class="text-3xl">
              CUSTOM ROUTER (just using <code>{`<Show />`}</code>)
            </div>
            <button onClick={() => setUseCustomRouter(0)}>
              Flip back to normal router
            </button>
          </div>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <Route
        path="/"
        component={() => (
          <Show
            when={route() === 0}
            fallback={
              <WatcherComp>
                <div class="text-5xl text-blue-600">
                  <h1>demo page</h1>
                </div>
              </WatcherComp>
            }
          >
            <WatcherComp>
              <Main />
            </WatcherComp>
          </Show>
        )}
      ></Route>
    </MemoryRouter>
  );
  return (
    <>
      <div class="flex justify-between w-screen">
        <div class="flex w-full">
          <button onClick={() => setRoute(0)}>Index</button>
          <button onClick={() => setRoute(1)}>Other page</button>
        </div>
        <button onClick={() => setUseCustomRouter(0)}>
          Flip back to normal router
        </button>
      </div>
      <Suspense>
        <WatcherComp>
          {route() === 0 ? (
            <Main />
          ) : route() === 1 ? (
            <div class="text-5xl text-blue-600">
              <h1>demo page</h1>
            </div>
          ) : (
            <></>
          )}
        </WatcherComp>
      </Suspense>
    </>
  );
}
