function decode(str, currentIndex) {
    let newIndex = currentIndex
    const type = str.substr(newIndex, 1)
    const lengthIndex = str.indexOf('\r\n', newIndex)
    const length = parseInt(str.slice(newIndex + 1, lengthIndex), 10)

    if (type === '*') {
      const value = []
      newIndex = lengthIndex + 2
      for (let i = 0; i < length; i++) {
        const entry = decode(str, newIndex)
        value.push(entry.value)
        newIndex = entry.newIndex
      }
      return { value, newIndex }
    } else if (type === '$') {
      newIndex = lengthIndex + 2

      let value

      if( length === '-1') {
        value = null
      } else {
         value = str.substr(newIndex, length)
         newIndex = newIndex + length + 2
      }

      return { value, newIndex }
    } else if (type === '+') {
      const endValue = str.indexOf('\r\n', newIndex)
      const value = str.slice(newIndex + 1, endValue)
      newIndex = endValue + 2

      return { value, newIndex}
    } else if (type === ':') {
      const endValue = str.indexOf('\r\n', newIndex)
      const value = parseInt(str.slice(newIndex + 1, endValue), 10)
      newIndex = endValue + 2

      return { value, newIndex}
    } else if (type === '-') {
      const endValue = str.indexOf('\r\n', newIndex)
      const value = str.slice(newIndex + 1, endValue)
      throw new Error(value)
    }
    throw new Error('invalid Input')
}

console.log(decode('*6\r\n$3\r\nSET\r\n$3\r\nkey\r\n$5\r\nvalue\r\n+OK\r\n:1000\r\n$-1\r\n', 0).value)
