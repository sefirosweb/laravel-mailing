import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGroups } from '@/hooks/useGroups';
import { useLists } from '@/hooks/useLists';
import '@/lib/i18n';
import { Groups } from '@/pages/groups/Groups';
import { Lists } from '@/pages/lists/Lists';
import { Tab, TopNav } from '@/pages/layout/TopNav';
import { ToastProvider } from '@/ui/Toast';
import '@styles/app.scss';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 5_000, refetchOnWindowFocus: false },
    },
});

const validTabs: Tab[] = ['lists', 'groups'];

const readTabFromHash = (): Tab => {
    const h = window.location.hash.replace('#', '');
    return validTabs.includes(h as Tab) ? (h as Tab) : 'lists';
};

const Shell = () => {
    const [tab, setTab] = useState<Tab>(readTabFromHash);

    useEffect(() => {
        window.location.hash = tab;
    }, [tab]);

    useEffect(() => {
        const onHash = () => setTab(readTabFromHash());
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    const listsQ = useLists();
    const groupsQ = useGroups();

    const counts = {
        lists: listsQ.data?.length ?? 0,
        groups: groupsQ.data?.length ?? 0,
    };

    return (
        <ToastProvider>
            <TopNav tab={tab} onTab={setTab} counts={counts} />
            <main className="page">
                {tab === 'lists' && <Lists />}
                {tab === 'groups' && <Groups />}
            </main>
        </ToastProvider>
    );
};

const root = document.getElementById('root');
if (root) {
    createRoot(root).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Shell />
            </QueryClientProvider>
        </StrictMode>,
    );
}
