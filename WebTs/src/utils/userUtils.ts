export interface FormattedUser {
  name: string;
  email: string;
  phone: string;
  role: string;
}

// Function to format user data
export const formatUsers = (data: any[]): FormattedUser[] => {
  return data.map((user) => ({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }));
};
