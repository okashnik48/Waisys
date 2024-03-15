namespace AuthTypes {
  
    export namespace API {
      export type GetTokensRequest = {
        username: string;
        password: string;
      }
      export type GetTokensReply = {
        accessToken: string;
        refreshToken: string;
      }
      export type ChangeTokenRequest = {refreshToken: string};
      export type ChangeTokenReply =  GetTokensReply;
    }
  }
  
  export default AuthTypes;