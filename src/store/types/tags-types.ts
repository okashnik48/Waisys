namespace TagsTypes {
    export type Tag= {
        name: string;
        color: string;
      }
      
    export namespace API {
        export type GetTagsReply = Record<string, string>;
        export type GetTagsRequest = null;

        export type PostTagReply = null
        export type PostTagRequest = Tag
        

        export type PatchTagReply = null;
        export type PatchTagRequest = Record<string, string>;
    }
  }
  
  export default TagsTypes;