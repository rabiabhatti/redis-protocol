
function encode(input) {
  const length = input.length
  if(!input) {
    return '$-1\r\n'
  } else if (typeof input === 'string') {
    return '$' + length + '\r\n' + input + '\r\n'
  } else if ( Array.isArray(input)) {
    let res = ''
    let startValue = '*' + length + '\r\n'
    input.forEach(function (value) {
        res =  res + encode(value)
    })
    return startValue + res
  }
}

console.log(JSON.stringify(encode(['set', 'key', 'value'])))
