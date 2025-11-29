const ROLE_REGISTRY = [
  { code: 'preUser', id: 1, label: '준회원' },
  { code: 'user', id: 2, label: '정회원' },
  { code: 'admin', id: 4, label: '리자' },
  { code: 'official', id: 5, label: '공식계정' },
  { code: 'blacklist', id: 6, label: '강등/영구강등' },
] as const;

export type RoleId = (typeof ROLE_REGISTRY)[number]['id'];
export type RoleCode = (typeof ROLE_REGISTRY)[number]['code'];

export const ROLE = ROLE_REGISTRY.reduce(
  (acc, cur) => {
    acc[cur.code] = cur.id;
    return acc;
  },
  {} as Record<RoleCode, RoleId>
);

export const ROLE_LABEL = ROLE_REGISTRY.reduce(
  (acc, cur) => {
    acc[cur.id] = cur.label;
    return acc;
  },
  {} as Record<RoleId, string>
);

export const PRIVATE_USER_INFO_UPDATE_PERMISSION_ROLE_ID_LIST = [1];
