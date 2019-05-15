import config from './config.json';
import { use, request, configureStore } from 'wappsto-redux';

use(config);

request(async (options, successCallback, errorCallback) => {
  try{
    let response = await fetch(options.url, options);
    try{
      let json = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        json
      };
    }catch(e){
      return { ok: response.ok, status: response.status };
    }
  } catch(e){
    return { ok: false, status: e.status };
  }
});

export default store = configureStore();
