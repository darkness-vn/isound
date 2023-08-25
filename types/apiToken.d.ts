export interface iAPIToken {
    key: string
    token_limit: number
    token_expires: ExpiresIn | Date
    uid: string
    token_name: string
    token_content: string
    token_tags: string[]
  }
  
export interface ExpiresIn {
  _seconds: number
  _nanoseconds: number
}
  