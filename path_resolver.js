module.exports = pathResolver = (fullUrl) => {
    const url = fullUrl;
    const spliter = url.split("/");
    const length = spliter.length;
    if(length>1){
        return spliter[length-1];
    }else{
        return "/no";
    }
}