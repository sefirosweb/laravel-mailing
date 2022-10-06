import React from 'react'
import { Routes, Route } from "react-router-dom";

/* Pages */
import NotFound from "@/pages/NotFound";
import List from "@/pages/List";
import Groups from "@/pages/Groups";
import { APP_PREFIX } from "@/types/configurationType";

function RoutesPages() {
    return (
        <Routes>
            <Route path={`/${APP_PREFIX}`} element={<List />} />
            <Route path={`/${APP_PREFIX}/list`} element={<List />} />
            <Route path={`/${APP_PREFIX}/groups`} element={<Groups />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RoutesPages;
