namespace AdminUsersTypes {
  export type User = {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    username: string;
    password: string;
  }
  export type NewUser = {
    firstName: string;
    lastName: string;
    role: string;
    username: string;
    password: string;
  }
  export namespace API {
    export type GetAllUsersReply = {
      [x: string]: any;
      users: User[];
    };
    export type CreateUserRequest = {
      body: NewUser;
    };

    export type ChangeUserRequest = {
      id: string;
      body: User;
    };
    export type DeleteUserRequest = {
      id: string;
    };
  }
}

export default AdminUsersTypes;
