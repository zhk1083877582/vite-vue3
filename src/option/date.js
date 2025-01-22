function range(opt = {}) {
  // key title
  return {
    title: opt.title,
    key: opt.startKey,
    placeholder: '请选择日期',
    date: {
      type: 'daterange',
      disabled: opt.disabled
    },
    disabled: opt.disabledRange,
    filter: {
      check: opt.check
    },
    rules: opt.rules || [],
    data: {
      from: (info) => {
        if (info[opt.startKey]) {
          return [info[opt.startKey], info[opt.endKey]]
        } else {
          return null
        }
      },
      to: (val) => {
        let data = {}
        data[opt.startKey] = val[0]
        data[opt.endKey] = val[1]
        return data
      }
    }
  }
}

export default {
  range
}
