import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import {useSelector} from "react-redux";

export const GET_CATEGORY = '[E-COMMERCE APP] GET CATEGORY';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';
export const SAVE_CATEGORY = '[E-COMMERCE APP] SAVE CATEGORY';


export function getProduct(params)
{
    console.log('GET PRODUCT PARAMS: ', params);
    const request = axios.get(`${process.env.REACT_APP_API_URL}/user/${params.userId}/category`);

    return (dispatch) =>
        request.then((response) => {

                const data = {
                    id              : response.data._id,
                    response: ''
                };
                return dispatch({
                    type   : GET_CATEGORY,
                    payload: data
                })
            }
        );
}

export function saveCategory(data, user)
{
    console.log('SAVE CATEGORY DATA: ',data);
    console.log('SAVE PRODUCT DATA USER: ', user);
    //const request = axios.post('/api/create-ticket-app/ticket/save', data);
  const request = axios.post(`${process.env.REACT_APP_API_URL}/departments/department/new`
      ,{
      name: data.name
      });

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Department Saved'}));

                return dispatch({
                    type   : SAVE_CATEGORY,
                    data: data
                })
            }
        );
}


export function newProduct(params)
{



            const data = {
                id              : FuseUtils.generateGUID(),
                name            : '',
                height          : ''
            };
                return ({
                    type   : GET_CATEGORY,
                    payload: data,
                })


}
