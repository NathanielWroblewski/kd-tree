// Array#sort is unstable
export const sort = (array, compare) => {
  const list = array.map((value, index) => ({ value, index }))

  list.sort((a, b) => {
    const r = compare(a.value, b.value)

    return r == 0 ? a.index - b.index : r
  })

  return list.map(element => element.value)
}

export const flatten = items => {
  const flattened = []

  items.forEach(item => {
    Array.isArray(item) ? flattened.push(...flatten(item)) : flattened.push(item)
  })

  return flattened;
}
