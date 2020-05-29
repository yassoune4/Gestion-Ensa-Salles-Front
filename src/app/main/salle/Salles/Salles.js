import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import SallesTable from './SallesTable';
import SallesHeader from './SallesHeader';
import reducer from '../store/reducers';

function Salles()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <SallesHeader/>
            }
            content={
                <SallesTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('Salles', reducer)(Salles);
