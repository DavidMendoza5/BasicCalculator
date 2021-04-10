let op = '8+3*5/2+30.3*(2-5)'
// let op = '7+(1+8)-3'

function multiplying(number1, number2) {
  return parseFloat(number1)*parseFloat(number2)
}

function dividing(numer1, numer2) {
  return parseFloat(numer1)/parseFloat(numer2)
}

function adding(numer1, numer2) {
  return parseFloat(numer1)+parseFloat(numer2)
}

function subtractioning(numer1, numer2) {
  return parseFloat(numer1)-parseFloat(numer2)
}

function reviewOp(op_arr) {
  let op_rex = /[+*/-]/
  let index = 1

  while(op_rex.test(op_arr[index])) {
    if(op_arr[index] === '*') {
      op_arr[index-1] = multiplying(op_arr[index-1], op_arr[index+1])
      op_arr.splice(index,1)
      op_arr.splice(index,1)
    }
    if(op_arr[index] !== '*') {
      index+=2
    }
  }

  index = 1
  while(op_rex.test(op_arr[index])) {
    if(op_arr[index] === '/') {
      op_arr[index-1] = dividing(op_arr[index-1], op_arr[index+1])
      op_arr.splice(index,1)
      op_arr.splice(index,1)
    }
    if(op_arr[index] !== '/') {
      index+=2
    }
  }

  index = 1
  while(op_rex.test(op_arr[index])) {
    if(op_arr[index] === '+') {
      op_arr[index-1] = adding(op_arr[index-1], op_arr[index+1])
      op_arr.splice(index,1)
      op_arr.splice(index,1)
    }

    if(op_arr[index] !== '+') {
      index+=2
    }
  }

  index = 1
  while(op_rex.test(op_arr[index])) {
    if(op_arr[index] === '-') {
      op_arr[index-1] = subtractioning(op_arr[index-1], op_arr[index+1])
      op_arr.splice(index,1)
      op_arr.splice(index,1)
    }

    if(op_arr[index] !== '-') {
      index+=2
    }
  }
}

function checkParentheses(arr, index, operation) {
  let arr2 = []
  let rex = /[0-9]+/
  let actual_index = index+1

  for(let i = actual_index; i < operation.length; i++) {
    let value = operation.substr(i,1)

    if(value === ')') break

    if(rex.test(value)) {
      let new_index = i + 1
      let value2 = operation.substr(new_index,1)

      while((rex.test(value2) || value2 === '.') && new_index < operation.length) {
        value += value2
        i++
        new_index++
        value2 = operation.substr(new_index,1)
      }
      
      value = parseFloat(value)
    }

    if(value !== '(' && value !== ')') {
      arr2.push(value)
    }
    actual_index = i
  }

  reviewOp(arr2)
  let new_value = arr2.pop()
  arr.push(new_value)

  return actual_index
}

function decomposeOperation(operation) {
  let arr = []
  let rex = /[0-9]+/

  for(let index = 0; index < operation.length; index++) {
    let value = operation.substr(index,1)

    if(value === '(') {
      index = checkParentheses(arr, index, operation)
    }

    if(rex.test(value)) {
      let new_index = index + 1
      let value2 = operation.substr(new_index,1)

      while((rex.test(value2) || value2 === '.') && new_index < operation.length) {
        value += value2
        index++
        new_index++
        value2 = operation.substr(new_index,1)
      }
      
      // value = parseInt(value)
      value = parseFloat(value)
    }

    if(value !== '(' && value !== ')') {
      arr.push(value)
    }
    // arr.push(value)
  }
  console.log(arr)
  reviewOp(arr)
  console.log(arr)
  // let total_sum = arr.pop()
  // console.log(total_sum)
}

decomposeOperation(op)