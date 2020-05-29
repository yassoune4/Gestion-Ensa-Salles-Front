import React, {useEffect, useState} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import EvenementsTableHead from './EvenementsTableHead';
import * as Actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';

function EvenementsTable(props)
{
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    console.log('user data: ', user);
    const products = useSelector(({EvenementsUser}) => EvenementsUser.products.data);
    console.log('tickets data: ', products);

    const searchText = useSelector(({EvenementsUser}) => EvenementsUser.products.searchText);
    console.log('search text data ', searchText);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(products);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id       : null
    });

    useEffect(() => {
        console.log('CATEGORY USE EFFECT');
        dispatch(Actions.getCategory(user));
    }, [dispatch]);

    useEffect(() => {
        setData(searchText.length === 0 ? products : _.filter(products, item =>  item.name.toLowerCase().includes(searchText.toLowerCase())))
    }, [products, searchText]);

    function handleRequestSort(event, property)
    {
        const id = property;
        let direction = 'desc';

        if ( order.id === property && order.direction === 'desc' )
        {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(event)
    {
        if ( event.target.checked )
        {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }





    function handleChangePage(event, page)
    {
        console.log('page: ', page);
        setPage(page);
    }

    function handleChangeRowsPerPage(event)
    {
        console.log('event: ', event);
        setRowsPerPage(event.target.value);
    }

    return (
        <div className="w-full flex flex-col">

            <FuseScrollbars className="flex-grow overflow-x-auto">

                <Table className="min-w-xl" aria-labelledby="tableTitle">

                    <EvenementsTableHead
                        numSelected={selected.length}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <TableBody>
                        {_.orderBy(data, [
                            (o) => {
                            console.log('ORDER: ',order);
                                switch ( order.id )
                                {
                                    case 'categories':
                                    {
                                        return o.categories[0];
                                    }
                                    default:
                                    {
                                        return o[order.id];
                                    }
                                }
                            }
                        ], [order.direction])
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                                console.log('N: ',n);
                                const isSelected = selected.indexOf(n.id) !== -1;
                                return (
                                    <TableRow
                                        className="h-64 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                    >
                                        <TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onClick={event => event.stopPropagation()}
                                            />
                                        </TableCell>



                                        <TableCell className="categories" component="th" scope="row">
                                            {n.id}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.start}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.end}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.name}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.user !=undefined ? n.user.username : ''}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.user !=undefined ? n.user.role : ''}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.salle !=undefined ? n.salle.name : ''}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.salle !=undefined ? n.salle.department.name : ''}
                                        </TableCell>


                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(EvenementsTable);
