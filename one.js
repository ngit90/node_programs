/*function* myfun(){
    for(let i = 1;i <= 10;i++){
        yield i;
    }
}
let fun = myfun();
for(let i=1;i<=10;i++){
    console.log(fun.next().value);
}*/
/*
let arr = [3,6,1,8,2,3,5,8,12];

let sum2 = 0;
arr.forEach((val) => {
    sum2 += val;
});
console.log("sum = "+sum2);

let sum = arr.reduce((tot,val) => {
    return tot + val;
});

let rst = arr.filter( (val) => {
    return val %2 == 0
})
let dup = arr.filter((val,indx) => {
    return arr.indexOf(val) != indx
});
let distn = arr.filter( (val,ind) =>{
    return arr.indexOf(val) == ind;
});
console.log(sum);
console.log(rst);
console.log(dup);
console.log(distn);
*/
/*
let str = "jajlopjk";
let arr = str.split("");
console.log(arr);
arr.splice(2,1,'x');
console.log(arr);
let x = arr.splice(3,1);
console.log(arr);
arr.shift();
console.log(arr);
arr.pop();
console.log(arr);
setImmediate(()=>{
    console.log("ïts immediate");
});
let y = arr.join("");
console.log(y);
process.nextTick(() =>{
    console.log("this is nxttick");
});
*/
/*
function add(a,b){
    return a+b;
}
function mult(a,b){
    return a*b;
}
function operation(sum,x,y){
    return sum(x,y);
}

console.log(operation(add,5,7));
console.log(operation(mult,5,7)); */
/*
let arr = [4,6,8,2,14,17,16,24];
let data = arr.includes(22);
console.log(data);
let data1 = arr.every((val) => {
    return val%2 == 0;
});
console.log(data1);
let data2 = arr.some((val) => {
    return val%2 == 1;
});
console.log(data2);*/
/*
let tar = {
    name :"alex",
    age :34
};

let prox = new Proxy(tar, {
    set :function(obj,prop,val){
        if(prop in obj)
            return obj[prop];
        else
            return obj[prop] = val;
}});

console.log(prox.name);
console.log(prox.age);
prox.place = "kannur";
console.log(prox.place);
console.log(tar);*//*
function* genfun(){
    for(let i=1;i<=10;i++)
    {
        yield 5*i;
    }
}

let fun = genfun();
for(let i= 1;i<=5;i++)
console.log(fun.next().value);*/
/*
let arr = [3,6,1,10,12,3,15,18];
let rslt = arr.reduce((tot,val) => {
    if(val > tot[0]){
        tot[1] = tot[0];
        tot[0] = val;
    }
    else if((val < tot[0]) &&( val > tot[1])){
        tot[1] = val;
    }
    return tot;
},[-Infinity,-Infinity]);
console.log(rslt[1]);
let obj =  {"x": 20, "y": 10, "z": 50};
let x = Object.entries(obj);
let zz = x.filter(([key,val]) => {
    return val > 25;
});
console.log(Object.fromEntries(zz));
let y = x.sort(([,x],[,y]) => y -x );
let z = Object.fromEntries(y);
console.log(Object.keys(z));
let x = {"x": 10, "y": 5, "z": 15};
let s = 0;
for(let i in x){
    s += x[i];
}
console.log(s);
let x = {"a": 5, "b": 2};
let y =  {"c": 8, "d": 1};
let z = Object.assign(x,y);
let zz = Object.entries(z).sort(([,x],[,y]) => x -y );
console.log(zz);
let obb = {"a": 122, "b": 25, "c": 8, "d": 30};
lar = 0;
slar = 0;
for(let x in obb){
    if(obb[x] > lar){
        slar = lar;
        lar = obb[x];
    }
    else if((obb[x] < lar ) && (obb[x] > slar)){
        slar = obb[x];
    }
}
console.log(slar);
let ar1 = [1, 2, 2,2, 3, 3, 3, 4, 4, 4, 4] ;
let freq = {};
ar1.forEach((x) => {
    if(freq[x])
        freq[x]++;
    else
        freq[x] = 1;
});
console.log(freq);
let ob2 = {"a": 1, "b": 0, "c": null, "d": 5};
function remover(ob2){
    for(let x in ob2){
        if(ob2[x] == 0)
            delete ob2[x];
    }
    console.log(ob2);
}
remover(ob2);
let person = [{ name: "Alice", age: 25 }, { name: "Bob", age: 30 }, { name: "Charlie", age: 25 }];
let x = person.reduce((tot,val) => {
    const { age } = val;
    if(!tot[age])
        tot[age] = [];
    tot[age].push(val);
    return  tot;
},{});
console.log(x);
function calage(dat){
    let newd = dat.split("-").reverse().join("-");
    console.log(newd);
    let [day , mon , yer ] = dat.split("-");
    //let x = dt.getFullYear();
    let y = Number(yer);
    let rslt = 2024 - y;
    console.log(rslt);
}

calage("14-02-1990");*/
/*
let ob3 =  {"a": 3, "b": 5, "c": 1};
let d1 = Object.entries(ob3);
let d2 = d1.map(([key,val]) => `${key}=${val}`);
console.log(d2); */

function memoiz()
{
    let cache = {};
    return function(a,b){
        let keys = `${a},${b}`;
        if(cache[keys])
            return cache[keys];
        else{
            rslt = a+b;
            cache[keys] = rslt;
            return rslt;
        }
    }
}
let sum = memoiz();
console.log(sum(2,3));
console.log(sum(2,3));
console.log(sum(4,2));