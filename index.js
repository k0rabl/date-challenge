import {source, source2} from  './source.js'
import moment from 'moment'

// const {order, days} = source
const {order, days} = source2


const convertDate = (time) => {
  const hours = String(time).split('.')[0]
  const fraction = String(time).split('.')[1]

  const seconds = fraction > 0 
    ? fraction > 9 ? fraction / 5 * 3 : fraction * 10 / 5 * 3
    : 0

  const date = new Date()
  date.setHours(hours, seconds)

  return moment(date).format('LT')
}


const newObj = order.reduce((accum, elem, index) => {
  const start = convertDate(days?.[elem]?.start)
  const end = convertDate(days?.[elem]?.end)
  const name = `${start} - ${end}`

  if(accum[name]){
    const period = accum[name]
    const prev = order.indexOf(period[period.length - 1])

    index - prev === 1
      ? accum[name].push(elem)
      : accum[name + index] = [elem]
  }  else accum[name] = [elem]

  // accum[name] 
  //   ? accum[name].push(elem)
  //   : accum[name] = [elem]


  return accum
}, {})

console.log('newObj:', newObj);

let string = 'Period 1 \n'
for (const key in newObj) {
  if (Object.hasOwnProperty.call(newObj, key)) {
    const element = newObj[key];

    if (key.includes('Invalid date')) {
      string += `${element[0].slice(0, 3)}: Day off \n`
      continue
    }
    
    if(element.length > 1){
      string += `${element[0].slice(0, 3)} - ${element[element.length - 1].slice(0, 3)}: ${key} \n`
    } else {
      string += `${element[0].slice(0, 3)}: ${key} \n`
    }
  }
}

console.log(string);
/* 

  Period 1
  Mon: 10:00 AM - 7:30 PM
  Tue - Thu: 10:45 AM - 11:30 PM
  Sat - Sun: 9:00 AM - 6:00 PM

  Period 2
  Mon: 9:00 AM - 6:21 PM
  Tue: 10:00 AM - 7:11 PM
  Wed: 9:00 AM - 6:21 PM
  Thu: 10:00 AM - 7:11 PM
  Sat - Sun: 10:00 AM - 7:11 PM

  Period 3
  Mon - Tue: 7:30 AM - 6:30 PM
  Sat: 7:30 AM - 6:30 PM
  Sun: 9:00 AM - 6:00 PM 

*/