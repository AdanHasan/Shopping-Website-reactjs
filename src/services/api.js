import { axiosInstance as axios } from './axiosInstance'

const GET_ALL_ITEMS = () => `item/getAll`;

// const UPDATE_ITEM = () => `item/update/{itemId}`;
// const UPDATE_ITEM = () => `item/update/4`;
// const UPDATE_ITEM = () => `item/update/${itemBody.id}`;
const CREATE_NEW_USER = () => `user/create`;
const AUTHENTICATE = () => `api/public/authenticate`;
const GET_ALL_USERS = () => `user/getAll`
const GET_ALL_USER_NAMES = () => `userItems/getAll/userNames`

// const TEST_API = () => `api/public/test1`;

const CREATE_NEW_USER_ITEMS = () => `userItems/create`;
const CREATE_NEW_ORDER_ITEMS = () => `orderItems/create`;
const CREATE_NEW_ORDER_ITEM = () => `orderItems/create/one`;

const CREATE_ORDER = () => `order/create`;
const GET_ALL_ORDERS = () => `order/getAll`;
const CREATE_ITEM = () => `item/create`;

const GET_ALL_IDS = () => `orderItems/getAll/orderIds`;

export const getAllOrderItems = (orderId) => {
    // console.log(userItemsBody);
    return axios.get(`orderItems/getAll/${orderId}`);
}
export const getUserById = (userName) => {
    // console.log(userItemsBody);
    return axios.get(`user/get/id/${userName}`);
}
export const deleteUser = (userName) => {
    return axios.delete(`user/delete/name/${userName}`);
}
export const createOrderItems = (orderItemsBody) => {
    // console.log(userItemsBody);
    return axios.post(CREATE_NEW_ORDER_ITEMS(), orderItemsBody);
}
export const createOrderItem = (orderItemBody) => {
    // console.log(userItemsBody);
    return axios.post(CREATE_NEW_ORDER_ITEM(), orderItemBody);
}
export const deleteAllOrderItems = (orderItemsBody) => {
    // console.log(userItemsBody);
    return axios.delete(`orderItems/delete/allItems/${orderItemsBody.id}`);
}
export const deleteOrderItemsById= (orderItemsBody) => {
    // console.log(userItemsBody);
    return axios.delete(`orderItems/delete/${orderItemsBody.orderId}/${orderItemsBody.itemId}`);
}

export const updateOrderItemQuantity = (orderItemsBody) => {
    return axios.put(`orderItems/update/quantity/${orderItemsBody.orderId}/${orderItemsBody.itemId}`);
}
export const decOrderItemQuantity = (orderItemsBody) => {
    return axios.put(`orderItems/decrease/quantity/${orderItemsBody.orderId}/${orderItemsBody.itemId}`);
}

export const getAllOrderIds = () => {
    // console.log(userItemsBody);
    return axios.get(GET_ALL_IDS());
}

export const getAllUserNames = () => {
    // console.log(userItemsBody);
    return axios.get(GET_ALL_USER_NAMES());
}

// export const getAllUserItems = (userName) => {
//     // console.log(userItemsBody);
//     return axios.get(`userItems/getAll/${userName}`);
// }

export const getAllUserItems = (userItemsBody) => {
    // console.log(userItemsBody);
    return axios.get(`userItems/getAll/${userItemsBody.userName}`);
}

export const getUserStatus = (userName) => {
    // console.log(userItemsBody);
    return axios.get(`user/get/status/${userName}`);
}

export const createUserItems = (userItemsBody) => {
    // console.log(userItemsBody);
    return axios.post(CREATE_NEW_USER_ITEMS(), userItemsBody);
}

export const deleteUserItem = (userItemsBody) => {
    // console.log(userItemsBody);
    return axios.delete(`userItems/delete/${userItemsBody.userName}/${userItemsBody.id}`);
}


export const getQantity = (userName,itemId) => {
    return axios.get(`orderItems/get/quantity/item/${userName}/${itemId}`);
}


export const deleteUserItems = (userItemsBody) => {
    // console.log(userItemsBody);
    return axios.delete(`userItems/delete/${userItemsBody.userName}/${userItemsBody.id}`);
}

// export const getAllUserItems = (userItemsBody) => {
//     // console.log(userItemsBody);
//     return axios.get(`userItems/getAll/${userItemsBody.userId}`);
// }

// const CREATE_USER= () => `user/create`;

export const createOrder = (orderBody) => {
    // console.log(orderBody);
    return axios.post(CREATE_ORDER(), orderBody);
}

// export const createUser = (userBody) => {
//     // console.log(orderBody);
//     return axios.post(CREATE_USER(), userBody);
// }



export const getAllItems = () => {
    return axios.get(GET_ALL_ITEMS());
};

// export const createOrder = ( orderBody) => {
//     // console.log(orderBody);
//     return axios.post(CREATE_ORDER(), orderBody);
// }

export const createItem = (productBody) => {
    // console.log(orderBody);
    return axios.post(CREATE_ITEM(), productBody);
}



export const getAllOrders = () => {
    return axios.get(GET_ALL_ORDERS());
};



export const updateOrder = (orderBody) => {
    return axios.put(`order/update/${orderBody.id}`, orderBody);
}

export const updateOrderShippingAddress = (orderId,orderBody) => {
    return axios.put(`order/update/shippingAddress/${orderId}`, orderBody);
}
export const updateOrderStatus = (orderId) => {
    return axios.put(`order/update/status/${orderId}`);
}

export const deleteOrder = (orderBody) => {
    return axios.delete(`order/delete/${orderBody.id}`);
}

export const updateItem = (itemBody) => {
    return axios.put(`item/update/${itemBody.id}`, itemBody);
}
export const updateItemQuantity = (itemBody) => {
    return axios.put(`item/update/quantity/${itemBody.id}`);
}

export const createNewUser = (userBody) => {
    return axios.post(CREATE_NEW_USER(), userBody);
}

export const authenticate = (userBody) => {
    return axios.post(AUTHENTICATE(), userBody);
}

export const updateUser = (userSecondBody) => {
    // console.log(userSecondBody);
    return axios.put(`user/update/${userSecondBody.username}`, userSecondBody);
}

export const getAllUsers = () => {
    return axios.get(GET_ALL_USERS());
};




// export const testAuthenticatedApi = (params) => {
//     return axios.get(TEST_API(), {params: params});
// }

