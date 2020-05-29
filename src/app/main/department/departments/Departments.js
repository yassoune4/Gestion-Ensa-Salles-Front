import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import DepartmentsTable from './DepartmentsTable';
import DepartmentsHeader from './DepartmentsHeader';
import reducer from '../store/reducers';

function Departments()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <DepartmentsHeader/>
            }
            content={
                <DepartmentsTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('Departments', reducer)(Departments);
