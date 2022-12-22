

export function getTableName(
  table: 'user',
  userId: string
) {
  return `rentx:${table}:${userId}`
}