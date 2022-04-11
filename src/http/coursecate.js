/* 
    网站设置
    轮播图管理
    课程管理


    前台首页，列表，详情
*/
import instance from "../http/index";
const url = '/admin/coursecate/query';
function courseCateIndex() {
    return instance.get(url);
}

export {
    courseCateIndex
}