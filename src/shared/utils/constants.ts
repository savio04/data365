export enum APIS {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok'
}

export const columnNames = [
  'username',
  'UF',
  'name'
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

export enum PageTypes {
  Presidente = 'PRESIDENTE',
  Governador = 'GOVERNADOR',
  ViceGovernador = 'VICE_GOVERNADOR',
  Senador = 'SENADOR',
  DeputadoFederal = 'DEPUTADO_FEDERAL',
  DeputadoEstadual = 'DEPUTADO_ESTADUAL',
  Prefeito = 'PREFEITO',
  VicePrefeito = 'VICE_PREFEITO',
  Vereador = 'VEREADOR',
  Sistema = 'SISTEMA',
  Comercial = 'COMERCIAL',
};

export enum PostStatus {
  Published = 'PUBLISHED',
  Draft = 'DRAFT',
  Deleted = 'DELETED'
};

export enum PostTypes {
  Regular = 'REGULAR',
  Event = 'EVENT'
};

export enum PostContentTypes {
  Regular = 'REGULAR',
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Twitter = 'TWITTER'
};
