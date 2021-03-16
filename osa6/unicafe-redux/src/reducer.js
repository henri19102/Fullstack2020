const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let obj = {...state}
      obj.good++
      return obj
    case 'OK':
      let obj1 = {...state}
      obj1.ok++
      return obj1
    case 'BAD':
      let obj2 = {...state}
      obj2.bad++
      return obj2
    case 'ZERO':
      let obj3 = {...state}
      obj3.good=0
      obj3.bad=0
      obj3.ok=0
      return obj3
    default: return state
  }
  
}

export default counterReducer