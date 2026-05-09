import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconLogo, IconMail, IconUsers } from '@/ui/icons';
import { LanguageSwitcher } from './LanguageSwitcher';

export type Tab = 'lists' | 'groups';

interface TopNavProps {
    tab: Tab;
    onTab: (tab: Tab) => void;
    counts: { lists: number; groups: number };
}

interface TabDef {
    id: Tab;
    label: string;
    icon: ReactNode;
    count: number;
}

export const TopNav = ({ tab, onTab, counts }: TopNavProps) => {
    const { t } = useTranslation();

    const tabs: TabDef[] = [
        {
            id: 'lists',
            label: t('nav.lists'),
            icon: <IconMail size={14} />,
            count: counts.lists,
        },
        {
            id: 'groups',
            label: t('nav.groups'),
            icon: <IconUsers size={14} />,
            count: counts.groups,
        },
    ];

    return (
        <nav className="top-nav">
            <div className="top-nav-inner">
                <div className="nav-brand">
                    <IconLogo size={22} />
                    <span>{t('nav.appName')}</span>
                </div>
                <div className="nav-tabs">
                    {tabs.map((it) => (
                        <button
                            key={it.id}
                            className={`nav-tab ${tab === it.id ? 'is-active' : ''}`}
                            onClick={() => onTab(it.id)}
                        >
                            {it.icon}
                            {it.label}
                            <span className="nav-tab-count">{it.count}</span>
                        </button>
                    ))}
                </div>
                <div className="nav-right">
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};
