import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function EvenementsUserFields(props)
{
    console.log('PROPS: ', props);
    const dispatch = useDispatch();
    const product = useSelector(({EvenementsUserDepartment}) => EvenementsUserDepartment.product);
    const product2 = useSelector(({EvenementsUserFields}) => EvenementsUserFields.product2);
    console.log('PRODUCT: ',product);
    console.log('PRODUCT2: ',product2);
    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);
    console.log(form);
    const user = useSelector(({auth}) => auth.user);
    console.log('user: ',user)

    const suggestions = [
        'YES',
        'NO'
    ].map(item => ({
        value: item,
        label: item
    }));

    useEffect(() => {
        function updateProductState()
        {
            const params = props.match.params;
            const {categoryId} = params;
            console.log('PRODUCTID: ', categoryId);
            if ( categoryId === 'new' )
            {
                console.log('TRIGGERED NEW PRODUCT FUNCTION');
                dispatch(Actions.newProduct2(user, product));
            }
            else
            {
                console.log('TRIGGERED GET PRODUCT: ', props.match.params);
                dispatch(Actions.getProduct2(props.match.params));
            }
        }

        updateProductState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (product2.data && !form) ||
            (product2.data && form && product2.data.id !== form.id)
        )
        {
            setForm(product2.data);
        }
    }, [form, product2, setForm]);

    function handleChangeTab(event, tabValue)
    {
        console('TAB VALUE: ', tabValue);
        setTabValue(tabValue);
    }

    function handleChipChange(value, name)
    {

        console.log('VALUE: ', value);
        if(value.length != 0){
            setForm(_.set({...form}, name, value.value));
        }
        else{
            setForm(_.set({...form}, name, null));
        }
    }

    function handleAnotherChipChange(value, name)
    {

        console.log('VALUE: ', value);
        if(value.length !== 0){
            setForm(_.set({...form}, name, value.id));
        }
        else{
            setForm(_.set({...form}, name, null));
        }
    }

    function canBeSubmitted()
    {
        console.log('FORM: ', form);
        if(form.salles != undefined) {
            return (
                form.salles.length > 0 &&
                !_.isEqual(product2.data, form)
            );
        }else{

        }
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/user/events/" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Evenements pt2
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">

                                <div className="flex flex-col min-w-0">

                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">New Evenement: Salle</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveCategory2(form, user))}
                            >
                                Proceed
                            </Button>
                        </FuseAnimate>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Evenement Field"/>
                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (



                            <div>

                                <TextField
                                    className="mt-8 mb-16"
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                    label="Name"
                                    type="text"
                                    // value={form.categoryName}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="startdate"
                                    name="startdate"
                                    onChange={handleChange}
                                    label="StartDate"
                                    type="Date"
                                   // value={form.categoryName}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="starttime"
                                    name="starttime"
                                    onChange={handleChange}
                                    label="startTime"
                                    type="Time"
                                    // value={form.categoryName}
                                    variant="outlined"
                                    fullWidth
                                />


                                <TextField
                                    className="mt-8 mb-16"
                                    id="enddate"
                                    name="enddate"
                                    onChange={handleChange}
                                    label="EndDate"
                                    type="Date"
                                    // value={form.categoryName}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="endtime"
                                    name="endtime"
                                    onChange={handleChange}
                                    label="endTime"
                                    type="Time"
                                    // value={form.categoryName}
                                    variant="outlined"
                                    fullWidth
                                />


                                <FuseChipSelect
                                    className="w-full my-16"
                                    onChange={(value) => handleAnotherChipChange(value, 'salle')}
                                    placeholder="Select a single option"
                                    textFieldProps={{
                                        label          : 'Salles',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant        : 'standard'
                                    }}
                                    options={
                                        form.salles.map(item => (console.log('ITEM: ',item) ,{
                                            value: item.name,
                                            label: item.name,
                                            id: item.id
                                        }))
                                    }
                                />

                            </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('EvenementsUserFields', reducer)(EvenementsUserFields);
