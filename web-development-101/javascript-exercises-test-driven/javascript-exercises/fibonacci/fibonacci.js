const fibonacci = function(requiredMemberNo) {
    if(typeof(requiredMemberNo) === 'string')
        requiredMemberNo = parseInt(requiredMemberNo);
    if(requiredMemberNo < 1)
        return 'OOPS';
    if(requiredMemberNo < 2)
        return 1;
    let a = 0;
    let b = 1;
    let temp;
    for(let i = 2; i <= requiredMemberNo; i++) {
        temp = a;
        a = b;
        b = b + temp;
    }
    return b;
}

module.exports = fibonacci
