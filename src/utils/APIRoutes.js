export const host =
  "https://mern-stack-chat-application-server-side-1.onrender.com";
// export const host = "http://localhost:5000";
export const jwt = `${host}/jwt`;
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const sendEmailRoute = `${host}/api/auth/send-token`;
export const resetPasswordRoute = `${host}/api/auth/resetPassword`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setProfileRoute = `${host}/api/auth/profile`;
export const sendMsgRoute = `${host}/api/messages/addmsg`;
export const getAllMsgRoute = `${host}/api/messages/getallmsg`;
