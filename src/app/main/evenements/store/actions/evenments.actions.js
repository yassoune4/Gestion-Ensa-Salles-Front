import axios from 'axios';

export const GET_DEPARTMENTS= '[E-COMMERCE APP] GET DEPARTMENTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';

export function getCategory(params)
{
    // const request = axios.get('/api/create-ticket-app/tickets');
    //params = { userId : '5e014c852b74cb269058b3f3'  };
    console.log('params: ', params);
    /*
    const request = axios.get(`${process.env.REACT_APP_API_URL}/user/${params.uuid}/category`,{
         method: "GET",
         headers: {
             Accept: "application/json",
         }});
    */
    console.log(`${process.env.REACT_APP_API_URL}/salles/`);
    const request = axios.get(`${process.env.REACT_APP_API_URL}/evenements/`,{
        method: "GET",
        headers: {
            Accept: "application/json",

        }});

    console.log('request: ',request);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DEPARTMENTS,
                payload: response.data
            })
        )
            .then((response)=>{
                console.log('RESPONSE: ',response);
            })
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

