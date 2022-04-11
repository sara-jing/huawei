import instance  from "./index";

const url = '/admin/question';
function questionIndex(dataObj) {
    return instance.get('/login', {
        params: dataObj
    });
}

function questionDistroy(qid) {
    return instance.delete(url + '/'+qid);
}


export {
    questionIndex,
    questionDistroy
}