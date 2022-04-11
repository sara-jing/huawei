import instance  from '../http/index';
const url = '/admin/swiper';
function swiperIndex() {
    return instance.get(url);
}
function swiperCreate(dataObj) {
    return instance.post(url,dataObj);
}

function swiperShow(id) {
    return instance.get(url+'/'+id);
}

function swiperUpdate(id,dataObj) {
    return instance.put(url+'/'+id, dataObj);
}

function swiperDestroy(id) {
    return instance.delete(url+'/'+id);
}
export {
    swiperCreate,
    swiperIndex,
    swiperShow,
    swiperUpdate,
    swiperDestroy
}