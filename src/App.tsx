import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from 'react-router-dom';
import { logEvent } from "./amplitude";

function App() {
    const basePath = process.env.PUBLIC_URL + "/";

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={basePath} element={<AppInnhold />}>
                <Route path="overgangsstonad" element={<Redirect eventName={'overgangsstonad'} url={'overgangsstonad-enslig'} />}/>
                <Route path="barnetilsyn" element={<Redirect eventName={'barnetilsyn'} url={'barnetilsyn-enslig'} />}/>
                <Route path="skolepenger" element={<Redirect eventName={'skolepenger'} url={'skolepenger-enslig'} />}/>
                <Route path="tilleggsstonader" element={<Redirect eventName={'tilleggsstonader'} url={'tilleggsstonader-enslig'} />}/>
                <Route path="hva-naa" element={<Redirect eventName={'hva-naa'} url={'alene-med-barn'} />}/>
                <Route path="" element={<Redirect eventName={'alene-med-barn'} url={'alene-med-barn'} />}/>
            </Route>));

    return <RouterProvider router={router} />;
}

function AppInnhold() {
    return <Outlet />
}

const Redirect: React.FC<{ eventName: string; url: string; }> = ({ eventName, url}) => {
    logEvent('besøk', {'redirect': eventName});
    window.location.replace('https://www.nav.no/' + url);
    return <></>;
};

export default App;
