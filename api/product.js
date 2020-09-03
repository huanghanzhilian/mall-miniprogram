import {get, post, put, del} from '../utils/request';

export const getCategorySimpleList = () => {
  return get('/categorySimple/list')
}

export const getSubCateList = (categoryId) => {
  return get('/subCate/list?categoryId=' + `${categoryId}`)
}

export const getGoodsList = (params) => {
  return get('/goods/list', params)
}
