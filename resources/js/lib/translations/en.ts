export const en = {
    nav: {
        appName: 'Mailing',
        lists: 'Lists',
        groups: 'Groups',
        backToApp: 'Back to app',
    },
    footer: {
        builtBy: 'Built by',
        viewSource: 'View source on GitHub',
    },
    common: {
        save: 'Save changes',
        cancel: 'Cancel',
        confirm: 'Confirm',
        delete: 'Delete',
        close: 'Close',
        done: 'Done',
        search: 'Search...',
        noItems: 'No items.',
        sortByName: 'Name',
        sortBySelected: 'Assigned',
    },
    table: {
        showing: 'Showing',
        result: 'result',
        results: 'results',
        perPage: 'Per page',
        of: 'of',
    },
    status: {
        active: 'Active',
        all: 'All',
        deleted: 'Deleted',
    },
    deletedBadge: 'Deleted',
    restoreAction: 'Restore',
    restoreConfirm: {
        title: 'Restore item?',
        description: '"{{name}}" will be restored and become active again.',
    },
    lists: {
        title: 'Mailing lists',
        subtitle:
            'Each list bundles users and/or groups for code-based mail dispatch.',
        new: 'New list',
        searchPlaceholder: 'Search by name, code or description...',
        col: {
            name: 'Name',
            code: 'Code',
            description: 'Description',
            users: 'Users',
            groups: 'Groups',
            actions: 'Actions',
        },
        empty: {
            title: 'No lists',
            description: 'Create your first list to get started.',
        },
        emptyFiltered: {
            title: 'No results',
            description: 'Try a different search term.',
        },
        actions: {
            manageUsers: 'Manage users',
            manageGroups: 'Manage groups',
            edit: 'Edit',
            delete: 'Delete',
        },
        form: {
            createTitle: 'New list',
            createSubtitle: 'Create a new mailing list.',
            editTitle: 'Edit list',
            editSubtitlePrefix: 'Editing',
            name: 'Name',
            namePlaceholder: 'e.g. Monthly newsletter',
            code: 'Code',
            codePlaceholder: 'e.g. monthly_newsletter',
            codeHelp:
                'Snake_case identifier used to resolve the list from the backend.',
            description: 'Description',
            descriptionPlaceholder: 'What this list is for',
            descriptionHelp: 'Briefly describe what it does.',
            createBtn: 'Create list',
        },
        usersDrawer: {
            titlePrefix: 'Users in',
            subtitle: 'Mark users that should receive mail for this list.',
            empty: 'No users available.',
        },
        groupsDrawer: {
            titlePrefix: 'Groups for',
            subtitle:
                'Mark groups whose recipients are included in this list.',
            empty: 'No groups created.',
        },
        deleteConfirm: {
            title: 'Delete list?',
            description:
                '"{{name}}" will be deactivated. You can restore it later.',
        },
        toast: {
            created: 'List "{{name}}" created.',
            updated: 'List updated.',
            deleted: 'List "{{name}}" deleted.',
            restored: 'List "{{name}}" restored.',
        },
    },
    groups: {
        title: 'Mailing groups',
        subtitle:
            'Reusable destination addresses (aliases or mailboxes) shared across lists.',
        new: 'New group',
        searchPlaceholder: 'Search by name or recipient...',
        col: {
            name: 'Name',
            to: 'Recipient',
            description: 'Description',
            actions: 'Actions',
        },
        empty: {
            title: 'No groups',
            description: 'Create reusable groups for your lists.',
        },
        emptyFiltered: {
            title: 'No results',
            description: 'Try a different search term.',
        },
        actions: {
            edit: 'Edit',
            delete: 'Delete',
        },
        form: {
            createTitle: 'New group',
            createSubtitle: 'Create a reusable group.',
            editTitle: 'Edit group',
            editSubtitlePrefix: 'Editing',
            name: 'Name',
            namePlaceholder: 'e.g. Sales',
            to: 'Recipient (email)',
            toPlaceholder: 'sales@company.com',
            description: 'Description',
            descriptionPlaceholder: 'What this group is for',
            descriptionHelp: 'Briefly describe what it does.',
            createBtn: 'Create group',
        },
        deleteConfirm: {
            title: 'Delete group?',
            description:
                '"{{name}}" will be deactivated and removed from its lists. You can restore it later.',
        },
        toast: {
            created: 'Group "{{name}}" created.',
            updated: 'Group updated.',
            deleted: 'Group "{{name}}" deleted.',
            restored: 'Group "{{name}}" restored.',
        },
    },
} as const;
