export const NEXTPAGE = (obj) => {
  const page = obj.page
  const pageSize = obj.pageSize
  const totalCount = obj.totalCount
  const pages = Math.ceil(totalCount / pageSize)
  return page < pages
}
