import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import {useSelector} from "react-redux";

export const GET_SALLE = '[E-COMMERCE APP] GET_SALLE';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';
export const SAVE_EVENT = '[E-COMMERCE APP] SAVE_EVENT';


export function getProduct2(params)
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
                    type   : GET_SALLE,
                    payload: data
                })
            }
        );
}

export function saveCategory2(data, user)
{
    console.log('SAVE CATEGORY DATA: ',data);

    console.log('SAVE PRODUCT DATA USER: ', user);

    const start = data.startdate + 'T' + data.starttime + 'Z';
    const end = data.enddate + 'T' + data.endtime + 'Z';
    console.log('START: ', start);
    console.log('END: ', end);
    //const request = axios.post('/api/create-ticket-app/ticket/save', data);
    const request = axios.post(`${process.env.REACT_APP_API_URL}/evenements/evenement/new`, {
        name: data.name,
        start: start,
        end: end,
        salle: {
            id: data.salle
        },
        user: {
            id: user.uuid
        }
    });
  /*
    const request = axios.post(`${process.env.REACT_APP_API_URL}/salles/salle/new`
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
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Evenement Saved'}));

                return dispatch({
                    type   : SAVE_EVENT,
                    data: data
                })
          }
        );

}

export function newProduct2(user, product)
{

    const request = axios.get(`${process.env.REACT_APP_API_URL}/salles/department/${product.data.department}`);
    console.log('PARAMS: ', user);
    console.log('PARAMS: ', product);

     return (dispatch) =>
        request.then((response) => {

            const data = {
                id              : FuseUtils.generateGUID(),
                salles     : response.data

            };
            return dispatch({
                type   : GET_SALLE,
                payload: data
            })
           }
       );

}
