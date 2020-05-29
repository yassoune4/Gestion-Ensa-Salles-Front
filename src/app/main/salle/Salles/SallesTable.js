import React, {useEffect, useState} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import SallesTableHead from './SallesTableHead';
import * as Actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';

function SallesTable(props)
{
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    console.log('user data: ', user);
    const products = useSelector(({Salles}) => Salles.products.data);
    console.log('tickets data: ', products);

    const searchText = useSelector(({Salles}) => Salles.products.searchText);
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

                    <SallesTableHead
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
                                            {n.name}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.board}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.projector}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.network}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.speakers}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.positions}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.computers}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.conditioning}
                                        </TableCell>

                                        <TableCell className="truncate" component="th" scope="row">
                                            {n.department !=undefined ? n.department.name : ''}
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

export default withRouter(SallesTable);
