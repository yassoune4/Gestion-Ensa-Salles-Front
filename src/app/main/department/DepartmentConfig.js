import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const DepartmentConfig = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/apps/admin/departments/:departmentId',
            component: React.lazy(() => import('./department/Department'))
        },
        {
            path     : '/apps/admin/departments',
            component: React.lazy(() => import('./departments/Departments'))
        }
    ]
};
