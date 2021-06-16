import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Docs from "./components/Docs";
import Header from "./components/Header";
import Home from "./components/Home";

export default function App() {
    const [search, setSearch] = useState("");

    return (
        <div className="app flex flex-col min-h-screen dark:bg-dark">
            <Header search={search} setSearch={setSearch} />
            <div className="content flex flex-1 justify-center">
                <main className="flex w-full max-w-4xl">
                    <HashRouter basename={process.env.PUBLIC_URL}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/docs" exact render={() => <Docs search={search} setSearch={setSearch} />} />
                            <Route path="/docs/:route+" render={() => <Docs search={search} setSearch={setSearch} />} />
                            <Route path="/search" render={() => <Docs search={search} setSearch={setSearch} />} />
                            <Route path="/" render={() => <div>404</div>} />
                        </Switch>
                    </HashRouter>
                </main>
            </div>
        </div>
    );
}