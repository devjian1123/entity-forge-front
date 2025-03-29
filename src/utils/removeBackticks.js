export function removeBackticks(ddl) {
  return ddl.replace(/`+/g, '')
}
