export interface TokenOptions {
  location: string,
  lang: string,
  feed: boolean,
  audio: boolean,
  video: boolean,
  download: boolean
  lyric: boolean,
  history: boolean,
  playlist: boolean
}

export interface iAPIToken {
    key: string
    token_limit: number
    token_expires: ExpiresIn | Date
    uid: string
    options: TokenOptions
    token_name: string
    token_content: string
    token_tags: string[]
  }
  
export interface ExpiresIn {
  _seconds: number
  _nanoseconds: number
}
  