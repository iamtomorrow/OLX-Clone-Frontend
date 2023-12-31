/* 
##
## Copyright (c) Tomorrow Group.
## Licensed under the MIT License.
##
*/

import API from "../assistant/api"

const doSignin = ( email: string, password: string ) => {
    return API.signin(email, password);
}

export { doSignin };
