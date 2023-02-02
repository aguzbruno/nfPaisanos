

export function changeUsaToArg(number:string){
    let realNumber = ""
    for (let i = 0; i<number.length;i++){
        if (number[i] === ','){
            realNumber = realNumber + ''
        }else if (number[i] === '.'){
            return Number(realNumber)
        }
        else{
            realNumber = realNumber + number[i];
        }
    }
    return Number(realNumber)
}

export function stringEthToNumber(bid:string){
    if(bid?.length>5){
        return Number(bid.slice(0,-3))
    }
}