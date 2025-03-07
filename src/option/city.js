import server from '@/config/server/index.js'
import ruleOpt from '@/option/rule.js'
import { reactive } from 'vue'

let api = {
  getAreacodePropertyList: () => {
    return server.api().post('/hft-portal/v1/city/list')

  },
  getStreetList: () => {
    // return server.api().get('/hft-portal/v1/city/street/list')
  }
}

function getStreetList(params) {
  return api
    .getStreetList()
    .fetch(params)
    .then((res) => {
      return res.map((item) => {
        item.key = item.streetCode.toString()
        item.value = item.streetName
        return item
      })
    })
}

function listByCityId(params) {
  // return api
  //   .getAreacodePropertyList()
  //   .fetch(params)
  //   .then((res) => {
  //     return res.map((item) => {
  //       item.key = item.cityCode.toString()
  //       item.value = item.cityName
  //       return item
  //     })
  //   })
  let level1 = [
    {
      "label": "天津市",
      "value": "120000"
    },
    {
      "label": "河北省",
      "value": "130000"
    },
  ]
  let level2 = [
    {
      "label": "和平区",
      "value": "120101"
    },
    {
      "label": "河东区",
      "value": "120102"
    },
  ]
  let level3 = [
    {
      "label": "长安区",
      "value": "130102"
    },
    {
      "label": "桥西区",
      "value": "130104"
    },
    {
      "label": "新华区",
      "value": "130105"
    }
  ]

  if (params.level == 2) {
    let list = level1.map((item) => {
      item.key = item.value.toString()
      item.value = item.label
      return item
    })
    return Promise.resolve(list)
  } else if (params.level == 3) {
    let list = level2.map((item) => {
      item.key = item.value.toString()
      item.value = item.label
      return item
    })
    return Promise.resolve(list)
  } else if (params.level == 3) {
    let list = level2.map((item) => {
      item.key = item.value.toString()
      item.value = item.label
      return item
    })
    return Promise.resolve(list)
  } else if (params.level == 4) {
    let list = level3.map((item) => {
      item.key = item.value.toString()
      item.value = item.label
      return item
    })
    return Promise.resolve(list)
  }
}

// 省市联动 层级(1:国 2:省 3:市 4:区,5:街道)
function getareaCodeList(level = 2, parentCode = '', city = '') {
  console.log("🚀 ~ city.js:78 ~ getareaCodeList ~ level:", level, parentCode)
  let params = {
    page: '1',
    rows: '50',
    level: level,
    parentCode: parentCode
  }
  if (level == 5) {
    params.cityCode = level == 5 ? parentCode : ''
    return getStreetList(params).then((res) => {
      return res
    })
  } else {
    return listByCityId(params).then((res) => {
      return res
    })
  }
}

function create(opt) {
  console.log(opt, '城市信息')
  let province = {
    key: 'provinceCode',
    col: 8,
    placeholder: '请选择省',
    disabled: opt.disabled || false,
    load: (o) => {
      getareaCodeList().then((res) => {
        console.log("🚀 ~ city.js:208 ~ getareaCodeList ~ res:", res)
        o.select.options = res
      })
    },
    select: {
      options: [],
      filterable: true
    },
    change: (data) => {
      console.log("🚀 ~ city.js:221 ~ create ~ data:", data)
      data.info.provinceName = data.editValue ?
        data.option.select.options.filter((item) => item.key == data.editValue)[0].value : ''
      data.info.cityCode = ''
      data.info.areaCode = ''
      city.select.options = []
      area.select.options = []
      getareaCodeList(3, data.value).then((res) => {
        console.log("🚀 ~ city.js:118 ~ getareaCodeList ~ res:", res)
        city.select.options = res
      })
    }
  }
  let city = reactive({
    key: 'cityCode',
    col: 8,
    placeholder: '请选择市',
    disabled: opt.disabled || false,
    load: (o) => {
      if (opt.info.provinceCode) {
        getareaCodeList(3, opt.info.provinceCode).then((res) => {
          o.select.options = res
        })
      }
    },
    select: {
      options: [],
      filterable: true
    },
    change: (data) => {
      data.info.cityName = data.editValue ? data.editValue.label : ''
      getareaCodeList(4, data.value).then((res) => {
        area.select.options = res
      })
    }
  })
  let area = reactive({
    key: 'areaCode',
    col: 8,
    placeholder: '请选择区',
    disabled: opt.disabled || false,
    load: (o) => {
      if (opt.info.cityCode) {
        getareaCodeList(4, opt.info.cityCode).then((res) => {
          o.select.options = res
        })
      }
    },
    select: {
      options: [],
      filterable: true
    },
    change: (data) => {
      data.info.areaName = data.editValue ? data.editValue.label : ''
    }
  })

  function group() {
    return [province, city, area]
  }
  let option = {
    title: opt.title || '地址',
    col: opt.col || 24,
    group: group(),
    rules: opt.rules ? opt.rules : []
  }
  return option
}

export default {
  create
}
