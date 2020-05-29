import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const SalleConfig = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/apps/admin/salles/:salleId',
            component: React.lazy(() => import('./Salle/Salle'))
        },
        {
            path     : '/apps/admin/salles',
            component: React.lazy(() => import('./Salles/Salles'))
        }
    ]
};
