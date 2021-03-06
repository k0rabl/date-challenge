import * as data from  './source.js'
import moment from 'moment'

let string = ''

const convertDate = time => {
  const hours = String(time).split('.')[0]
  const fraction = String(time).split('.')[1]

  const seconds = !!fraction
    ? fraction > 9 
      ? fraction / 5 * 3 
      : fraction * 10 / 5 * 3
    : 0

  const date = new Date()
  date.setHours(hours, seconds)

  return moment(date).format('LT')
}

const sortDates = ({order, days}) => {
  return order.reduce((accum, elem, index) => {
    const start = convertDate(days?.[elem]?.start)
    const end = convertDate(days?.[elem]?.end)
    
    const name = `${start} - ${end}`
    let exist = accum[name]
    
    if (accum[name + (index - 1)]) 
      exist = accum[name + (index - 1)]
  
    if(exist){
      const prev = order.indexOf(exist[exist.length - 1])

      index - prev === 1
        ? exist.push(elem)
        : accum[name + index] = [elem]
      
    }  else accum[name] = [elem]
  
    return accum
  }, {})
}

for (const key in data) {
  if (Object.hasOwnProperty.call(data, key)) {
    const period = data[key];
    const dates = sortDates(period)

    string += `Period ${key[key.length - 1]} \n`

    for (const time in dates) {
      const date = dates[time];
      const firstDay = date[0].slice(0, 3)
      const lastDay = date[date.length - 1].slice(0, 3)

      const days = lastDay !== firstDay 
        ? `${firstDay} - ${lastDay}` 
        : lastDay

      string += `${days}: ${time.includes('Invalid date') ? 'Day off' : time} \n`
    }
    string += '\n'
  }
}

console.log(string)