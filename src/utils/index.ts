export const isAdmin = (userInfo: any) => userInfo.role === 'admin';

export const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '';

// export const track = (params) => {
//   return params;
// };
