function revr(str){
    let flag = false;
    let i,j =str.length - 1;
    for( i=0;i<= (str.length)/2;i++){
        if(str.charAt(j) != str.charAt(i)){
            flag = true;
            break;
        }
        j--;
    }
    if(flag == false)
        console.log("palindrome");
    else
    console.log("not palindrme");
}
revr("xyx");

let arr =[1,2,3,4,5];
let sum = 0;
for(let x of arr){
    let flag = false;
    if(x ==0 || x==1)
        continue;
    for(let j=2;j<=x/2;j++){
        if(x%j == 0){
            flag = true;
            break;
        }
    }
    if(flag == false)
        sum+=x;
}
console.log(sum);

let str = "hello";
let count = 0;
for(let i=0 ;i< str.length;i++){
    if(str.charAt(i)== 'a' ||str.charAt(i)== 'e'|| str.charAt(i)== 'i'|| str.charAt(i)== 'o'  || str.charAt(i)== 'u')
        count++;
}
console.log(count);


