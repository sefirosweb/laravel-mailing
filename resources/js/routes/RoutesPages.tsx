import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { APP_PREFIX } from "@/types/configurationType";
import List from "@/pages/List";
import Groups from "@/pages/Groups";
import { NotFound } from "@/pages/NotFound";
import Layout from '@/pages/layout/Layout';

export default () => {
    return (
        <Routes>
            <Route path={`${APP_PREFIX}/`} element={<Layout />}>
                <Route index element={<Navigate replace to={`list`} />} />
                <Route path={`list`} element={<List />} />
                <Route path={`groups`} element={<Groups />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}