import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {RegisterConfig} from "../main/register/RegisterConfig";
import {LogoutConfig} from "../main/logout/LogoutConfig";
import {LoginConfig} from "../main/login/LoginConfig";
import {DepartmentConfig} from "../main/department/DepartmentConfig";
import {SalleConfig} from "../main/salle/SalleConfig";
import {EvenementsConfig} from "../main/evenements/EvenementsConfig";
import {EventsUserConfig} from "../main/evenementUser/EventsUserConfig";

const routeConfigs = [
    ExampleConfig,
    RegisterConfig,
    LogoutConfig,
    LoginConfig,
    DepartmentConfig,
    SalleConfig,
    EvenementsConfig,
    EventsUserConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    }
];

export default routes;
