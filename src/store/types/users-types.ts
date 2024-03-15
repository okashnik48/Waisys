namespace UsersTypes {
    export type UserInfo= {
        id: string;
        firstName: string;
        lastName: string;
        role: "ADMIN" | "COOK" | "WAITER" | "";
        username: string;
      }
    export type UserProps = {
      accessToken: string,
      refreshToken: string,
      id: string,
      firstName: string,
      lastName: string,
      role: "ADMIN" | "COOK" | "WAITER" | "",
      username: string
    };
    export namespace API {
      export type GetUserInfoReply = UserInfo;
      export type GetUserInfoRequest = null;
    }
  }
  
  export default UsersTypes;