let ar1 = [3,5,8,1,12];
let ar2 = [6,8,4,23,2,45];
let ar3 = ar1.concat(ar2);
console.log(ar3);
let ar4 = ar3.filter((val,indx) => {
    return ar3.indexOf(val) != indx;
});
console.log(ar4);
ar1.fill("oh!",2);
console.log(ar1);
min = ar2[0];
smin = ar2[0];
ar2.forEach((data)=> {
    if(data <min){
        smin = min;
        min = data;
    }
    else if(data>min && data<smin)
        smin = data;
});
console.log(min,smin);
