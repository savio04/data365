export enum APIS {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok'
}

export const columnNames = [
  'username'
]

export enum UserTypes {
  Root = 'ROOT',
  Admin = 'ADMIN',
  User = 'USER',
  Candidate = 'CANDIDATE'
};

export enum UserStatus {
  Active = 'ACTIVE',
  Incomplete = 'INCOMPLETE',
  Blocked = 'BLOCKED',
  Deleted = 'DELETED',
};