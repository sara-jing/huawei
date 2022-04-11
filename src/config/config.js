const SUCCESS = 200;
const FAIL = 404;
const URLPATH = 'http://127.0.0.1:7001';
function HandlerBeforeImageUpload(file){
    let imgTypeFlag = true,imgSizeFlag = true;
    let {size, type} = file;
    let maxSize = 200 * 1024;
    let imgType = ['image/png', 'image/jpeg','image/jpg','image/gif','image/webp'];
    if(size > maxSize) {
      imgSizeFlag = false;
      this.$message.warning('上传的文件最多不能超过500kb');
    }
    if(!imgType.includes(type)) {
      imgTypeFlag = false;
       this.$message.warning('上传文件格式有误');
        return imgTypeFlag && imgSizeFlag;
    }
  }
export {
    SUCCESS,
    FAIL,
    URLPATH,
    HandlerBeforeImageUpload
}