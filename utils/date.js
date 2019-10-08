export default (() => {
  return {
    GET: (type, time) => {
      let nd = time ? new Date(time) : new Data()
      let YYYY = nd.getFullYear()
      let MM = nd.getMonth() + 1
      let DD = nd.getDate()
      let hh = nd.getHours()
      let mm = nd.getMinutes()
      let ss = nd.getSeconds()
      let reNum = (n) => n < 10 ? '0' + n : n
      let val = null
      if (type === 'Y/M/D') val = YYYY + '/' + reNum(MM) + '/' + reNum(DD)
      if (type === 'Y-M-D') val = YYYY + '-' + reNum(MM) + '-' + reNum(DD)
      if (type === 'YMD') val = YYYY + '年' + reNum(MM) + '月' + reNum(DD) + '日'
      if (type === 'YMDhms') val = YYYY + '/' + reNum(MM) + '/' + reNum(DD) + ' ' + reNum(hh) + ':' + reNum(mm) + ':' + reNum(ss)
      if (type === 'Y-M-Dhms') val = YYYY + '-' + reNum(MM) + '-' + reNum(DD) + ' ' + reNum(hh) + ':' + reNum(mm) + ':' + reNum(ss)
      if (type === 'h') val = hh
      if (type === 'h:m:s') val = reNum(hh) + ':' + reNum(mm) + ':' + reNum(ss)
      return val
    }
  }
})()
