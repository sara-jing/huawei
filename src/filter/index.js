let filter = {
    formatTimeAll(time) {
        let date = new Date(time);
        let month =
          date.getMonth() + 1 >= 10
            ? date.getMonth() + 1
            : "0" + date.getMonth() + 1;
        let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        let str = date.getFullYear() + "-" + month + "-" + day+'  ' + hours +':'+ minutes + ':'+ seconds;
        return str;
    }
}
export default filter;