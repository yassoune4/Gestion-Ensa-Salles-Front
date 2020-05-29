import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const EventsUserConfig = {
    settings: {
        layout: {}
    },

    routes  : [
        {
            path     : '/apps/user/events/new',
            component: React.lazy(() => import('./evenementsUserDepartment/EvenementsUserDepartment'))
        },
        {
            path     : '/apps/user/salleevent/:categoryId',
            component: React.lazy(() => import('./EvenementsUserFields/EvenementsUserFields'))
        },
        {
            path     : '/apps/user/events',
            component: React.lazy(() => import('./evenementsUser/EvenementsUser'))
        }
    ]
};
