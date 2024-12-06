// @refresh reload
import { Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Main from "./routes/main";
import { WatcherComp } from "./routes/watcher";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <a href="/">Index</a>
          <a href="/demo">Other page</a>
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
  );
}
