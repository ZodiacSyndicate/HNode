export const insertData = <T>(source: T[], data: T): T[] => {
  const arr = [...source]
  arr.push(data)
  return arr
}
