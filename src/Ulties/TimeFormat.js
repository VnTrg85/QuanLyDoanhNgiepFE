const formatTime = (type, date) => {
  switch (type) {
    case 'date':
      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    case 'day':
      if (date.getDay() < 10) return '0' + date.getDay()
      else return date.getDay()
    case 'month':
      if (date.getMonth() < 10) return '0' + date.getMonth()
      else return date.getMonth()
    case 'year':
      return date.getFullYear()
    case 'hour':
      if (date.getHours() < 10) return '0' + date.getHours()
      else return date.getHours()
    case 'minute':
      if (date.getMinutes() < 10) return '0' + date.getMinutes()
      else return date.getMinutes()
    default:
      return date
  }
}

const validateTime = (timeS, timeE) => {
  if (timeS.getTime() < timeE.getTime()) {
    return true
  } else return false
}

const compareToNow = time => {
  return Date.now() < time.getTime()
}

export { formatTime, validateTime, compareToNow }
