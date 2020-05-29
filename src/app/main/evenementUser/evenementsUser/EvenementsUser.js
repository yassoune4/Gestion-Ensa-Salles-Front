import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import EvenementsTable from './EvenementsTable';
import EvenementsUserHeader from './EvenementsUserHeader';
import reducer from '../store/reducers';

function EvenementsUser()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <EvenementsUserHeader/>
            }
            content={
                <EvenementsTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('EvenementsUser', reducer)(EvenementsUser);
