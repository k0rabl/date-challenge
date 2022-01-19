import {source} from  './source.js'

const {order, days} = source

const time = {
  start: 0, 
  end: 0
}

order.map((element, index) => {
  if(days?.[element]?.start === time.start && days?.[element]?.end === time.end ){
    console.log(element, ':', time);
  }

  time.start = days?.[element]?.start
  time.end =  days?.[element]?.end  
})
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