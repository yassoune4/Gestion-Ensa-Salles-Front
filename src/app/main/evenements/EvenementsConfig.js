import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const EvenementsConfig = {
    settings: {
        layout: {}
    },
    auth   : authRoles.admin,
    routes  : [

        {
            path     : '/apps/admin/evenements',
            component: React.lazy(() => import('./evenmentsComponent/Evenments'))
        }
    ]
};
