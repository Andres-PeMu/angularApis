export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface createUserDTO extends Omit<User, 'id'> {

}
