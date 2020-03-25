export const  isNumber = (token) => {
    return !isNaN(Number(token));
}


export const inputAccount = document.getElementById("account");

export function insert(num){
    //document.form.textview.value = document.form.textview.value+num
    console.log(num)
    inputAccount.value = inputAccount.value+num;
}


export function clean(){
    inputAccount.value  = "";

}

export function back(){
    var exp = inputAccount.value ;
    inputAccount.value  = exp.substring(0,exp.length-1);
}
