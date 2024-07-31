export interface FormattedUser {
  name: string;
  email: string;
  adress: string;
  phone: string;
  role: string;
  gender: string;
  orders: number;
}

// Function to format user data
export const formatUsers = (data: any): FormattedUser[] => {
  return data.users.map((user: any) => ({
    name: user.name,
    adress: user.adress,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
    role: user.userRole.roleName,
    orders : user.cart,
  }));
};
