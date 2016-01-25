import {
  ACTION_START,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from 'redux-happy-async';

export default async function getJson(url, {dispatch, type, payload}) {
  dispatch({
    asyncStatus: ACTION_START,
    type,
    ...payload
  });

  let resp;
  try {
    resp = await window.fetch(url);
  } catch(err) {
    dispatch({
      asyncStatus: ACTION_ERROR,
      type,
      error: err,
      ...payload
    });
    return;
  }

  if (resp.status !== 200) {
    const respText = await resp.text();

    let error;
    try {
      error = JSON.parse(respText);
    } catch(err) {
      error = respText;
    }

    dispatch({
      asyncStatus: ACTION_ERROR,
      type,
      error,
      ...payload
    });
    return;
  }

  const responseJson = await resp.json();

  dispatch({
    asyncStatus: ACTION_SUCCESS,
    type,
    resp: responseJson,
    ...payload,
  });
}

