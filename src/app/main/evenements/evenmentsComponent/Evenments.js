import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import EvenmentsTable from './EvenmentsTable';
import EvenmentsHeader from './EvenmentsHeader';
import reducer from '../store/reducers';

function Evenments()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <EvenmentsHeader/>
            }
            content={
                <EvenmentsTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('Evenments', reducer)(Evenments);
