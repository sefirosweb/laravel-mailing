export const es = {
    nav: {
        appName: 'Mailing',
        lists: 'Listas',
        groups: 'Grupos',
        backToApp: 'Volver a la app',
    },
    footer: {
        builtBy: 'Hecho por',
        viewSource: 'Ver código en GitHub',
    },
    common: {
        save: 'Guardar cambios',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        delete: 'Eliminar',
        close: 'Cerrar',
        done: 'Hecho',
        search: 'Buscar...',
        noItems: 'No hay elementos.',
        sortByName: 'Nombre',
        sortBySelected: 'Asignados',
    },
    table: {
        showing: 'Mostrando',
        result: 'resultado',
        results: 'resultados',
        perPage: 'Por página',
        of: 'de',
    },
    status: {
        active: 'Activos',
        all: 'Todos',
        deleted: 'Eliminados',
    },
    deletedBadge: 'Eliminado',
    restoreAction: 'Restaurar',
    restoreConfirm: {
        title: '¿Restaurar elemento?',
        description: 'Se restaurará "{{name}}" y volverá a estar activo.',
    },
    lists: {
        title: 'Listas de correo',
        subtitle:
            'Cada lista agrupa usuarios y/o grupos a los que enviar correos por código.',
        new: 'Nueva lista',
        searchPlaceholder: 'Buscar por nombre, código o descripción...',
        col: {
            name: 'Nombre',
            code: 'Código',
            description: 'Descripción',
            users: 'Usuarios',
            groups: 'Grupos',
            actions: 'Acciones',
        },
        empty: {
            title: 'Sin listas',
            description: 'Crea tu primera lista para empezar.',
        },
        emptyFiltered: {
            title: 'Ningún resultado',
            description: 'Prueba con otro término de búsqueda.',
        },
        actions: {
            manageUsers: 'Gestionar usuarios',
            manageGroups: 'Gestionar grupos',
            edit: 'Editar',
            delete: 'Borrar',
        },
        form: {
            createTitle: 'Nueva lista',
            createSubtitle: 'Crea una nueva lista de correo.',
            editTitle: 'Editar lista',
            editSubtitlePrefix: 'Editando',
            name: 'Nombre',
            namePlaceholder: 'ej. Boletín mensual',
            code: 'Código',
            codePlaceholder: 'ej. monthly_newsletter',
            codeHelp:
                'Identificador en snake_case usado para resolver la lista desde el backend.',
            description: 'Descripción',
            descriptionPlaceholder: 'Para qué sirve esta lista',
            descriptionHelp: 'Explica brevemente para qué sirve.',
            createBtn: 'Crear lista',
        },
        usersDrawer: {
            titlePrefix: 'Usuarios en',
            subtitle:
                'Marca los usuarios que recibirán los correos de esta lista.',
            empty: 'No hay usuarios disponibles.',
        },
        groupsDrawer: {
            titlePrefix: 'Grupos de',
            subtitle:
                'Marca los grupos cuyos destinatarios se incluyen en esta lista.',
            empty: 'No hay grupos creados.',
        },
        deleteConfirm: {
            title: '¿Eliminar lista?',
            description:
                '"{{name}}" se desactivará y no se enviará a sus destinatarios. Podrás restaurarla.',
        },
        toast: {
            created: 'Lista "{{name}}" creada.',
            updated: 'Lista actualizada.',
            deleted: 'Lista "{{name}}" eliminada.',
            restored: 'Lista "{{name}}" restaurada.',
        },
    },
    groups: {
        title: 'Grupos de correo',
        subtitle:
            'Direcciones agrupadas (alias o buzones) reutilizables en varias listas.',
        new: 'Nuevo grupo',
        searchPlaceholder: 'Buscar por nombre o destinatario...',
        col: {
            name: 'Nombre',
            to: 'Destinatario',
            description: 'Descripción',
            actions: 'Acciones',
        },
        empty: {
            title: 'Sin grupos',
            description: 'Crea grupos reutilizables para tus listas.',
        },
        emptyFiltered: {
            title: 'Ningún resultado',
            description: 'Prueba con otro término de búsqueda.',
        },
        actions: {
            edit: 'Editar',
            delete: 'Borrar',
        },
        form: {
            createTitle: 'Nuevo grupo',
            createSubtitle: 'Crea un grupo reutilizable.',
            editTitle: 'Editar grupo',
            editSubtitlePrefix: 'Editando',
            name: 'Nombre',
            namePlaceholder: 'ej. Comerciales',
            to: 'Destinatario (email)',
            toPlaceholder: 'comerciales@empresa.com',
            description: 'Descripción',
            descriptionPlaceholder: 'Para qué sirve este grupo',
            descriptionHelp: 'Explica brevemente para qué sirve.',
            createBtn: 'Crear grupo',
        },
        deleteConfirm: {
            title: '¿Eliminar grupo?',
            description:
                '"{{name}}" se desactivará y dejará de enviar a sus listas asociadas. Podrás restaurarlo.',
        },
        toast: {
            created: 'Grupo "{{name}}" creado.',
            updated: 'Grupo actualizado.',
            deleted: 'Grupo "{{name}}" eliminado.',
            restored: 'Grupo "{{name}}" restaurado.',
        },
    },
} as const;
