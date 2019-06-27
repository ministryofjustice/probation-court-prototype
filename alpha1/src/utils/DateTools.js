import moment from 'moment'

const getDateFromProps = (params) => {
  const currentDate = moment()
  if (params.day && params.month && params.year) {
    currentDate.set('date', params.day)
    currentDate.set('month', parseInt(params.month, 10) - 1)
    currentDate.set('year', params.year)
  }
  return currentDate
}

const lastMonth = (dateObject = moment()) => {
  const prev = moment(dateObject).month(dateObject.month() - 1)
  return {
    month: prev.format('MM'),
    monthName: prev.format('MMMM'),
    year: prev.format('YYYY')
  }
}

const nextMonth = (dateObject = moment()) => {
  const next = moment(dateObject).month(dateObject.month() + 1)
  return {
    month: next.format('MM'),
    monthName: next.format('MMMM'),
    year: next.format('YYYY')
  }
}

const getAge = (dateOfBirth) => {
  return moment().diff(moment(dateOfBirth, 'DD/MM/YYYY'), 'years')
}

export {
  getDateFromProps,
  getAge,
  lastMonth,
  nextMonth
}
