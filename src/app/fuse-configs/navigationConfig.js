import authRoles from "../auth/authRoles";

const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'      : 'department',
                'title'   : 'DEPARTMENTS',
                'type'    : 'collapse',
                'auth'    : authRoles.admin,
                'icon'    : 'shopping_cart',
                'url'     : '/apps/department',
                'children': [
                    {
                        'id'   : 'departments',
                        'title': 'See Available Departments',
                        'type' : 'item',
                        'url'  : '/apps/admin/departments',
                        'exact': true
                    },
                    {
                        'id'   : 'category',
                        'title': 'Category Detail',
                        'type' : 'item',
                        'url'  : '/apps/admin/departments/:departmentId',
                        'exact': true
                    }

                ]
            },
            {
                'id'      : 'salle',
                'title'   : 'SALLES',
                'type'    : 'collapse',
                'icon'    : 'shopping_cart',
                'auth'    : authRoles.admin,
                'url'     : '/apps/salles',
                'children': [
                    {
                        'id'   : 'salles',
                        'title': 'See Available Salles',
                        'type' : 'item',
                        'url'  : '/apps/admin/salles',
                        'exact': true
                    },
                    {
                        'id'   : 'salle detail',
                        'title': 'Salle Detail',
                        'type' : 'item',
                        'url'  : '/apps/admin/salles/:salleId',
                        'exact': true
                    }

                ]
            },
            {
                'id'      : 'evenements',
                'title'   : 'EVENEMENTS',
                'type'    : 'collapse',
                'icon'    : 'shopping_cart',
                'auth'    : authRoles.admin,
                'url'     : '/apps/evenements',
                'children': [
                    {
                        'id'   : 'evenements_all',
                        'title': 'See All Evenements',
                        'type' : 'item',
                        'url'  : '/apps/admin/evenements',
                        'exact': true
                    }

                ]
            },
            {
                'id'      : 'UserEvents',
                'title'   : 'Votre Evenements',
                'type'    : 'collapse',
                'icon'    : 'shopping_cart',
                'url'     : '/apps/events',
                'children': [
                    {
                        'id'   : 'UserAllEvents',
                        'title': 'See Your Events',
                        'type' : 'item',
                        'url'  : '/apps/user/events',
                        'exact': true
                    },
                    {
                        'id'   : 'Event Dep',
                        'title': 'Event Department',
                        'type' : 'item',
                        'url'  : '/apps/user/events/new',
                        'exact': true
                    },
                    {
                        'id'   : 'Event sal',
                        'title': 'Event sal',
                        'type' : 'item',
                        'url'  : '/apps/user/salleevent/:categoryId',
                        'exact': true
                    }

                ]
            }
        ]
    }
];

export default navigationConfig;
