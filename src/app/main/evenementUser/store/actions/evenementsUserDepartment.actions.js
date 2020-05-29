import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import {useSelector} from "react-redux";

export const GET_CATEGORY = '[E-COMMERCE APP] GET CATEGORY';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';
export const SELECT_DEPARTMENT = '[E-COMMERCE APP] SELECT_DEPARTMENT';


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

export function saveCategory(data)
{
   // console.log('SAVE CATEGORY DATA: ',data);
    //console.log('SAVE PRODUCT DATA USER: ', user);
    //const request = axios.post('/api/create-ticket-app/ticket/save', data);
  /*const request = axios.post(`${process.env.REACT_APP_API_URL}/salles/salle/new`
      ,{
      name: data.name,
      positions: data.positions,
      computers: data.computers,
      board: data.board,
      conditioning: data.conditioning,
      speakers: data.speakers,
      projector: data.projector,
      network : data.network,
      department: {
          id: data.department
      }
      });
    */
    const newdata = {
        id              : FuseUtils.generateGUID(),
        department     : data.department

    };

    console.log('DATA: ', data);
    console.log('NEWDATA: ', newdata);


    return ({
                    type   : SELECT_DEPARTMENT,
                    payload: newdata
                })

}


export function newProduct(params)
{

    const request = axios.get(`${process.env.REACT_APP_API_URL}/departments/`);

    return (dispatch) =>
        request.then((response) => {

            const data = {
                id              : FuseUtils.generateGUID(),
                departments      : response.data

            };
            return dispatch({
                type   : GET_CATEGORY,
                payload: data
            })
            }
        );

}
