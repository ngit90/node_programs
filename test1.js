async function getdata() {
    let promise1 = new Promise((reso,rej) => {
        let x = 10;
        if(x == 1)
            reso("data set ok");
        else
            rej("data not clear");
    });
    let rslt = await promise1;
    console.log(rslt);
    
}
getdata().catch( (err) => {
    console.error(err);
});

const promise1 = new Promise((resolve) => {
    resolve('Result from Promise 1');
});

const promise2 = new Promise((resolve) => {
    resolve('Result from Promise 2');
});

const promise3 = new Promise((resolve, reject) => {
    reject('Error from Promise 3');
});

// Using Promise.all
Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log('All promises resolved:', results);
    })
    .catch((error) => {
        console.log(error);
    });
    //---------------

    let ob1 = {
        name : "xyz",
        age:65,
        fullname : function(){
            return this.name +" "+this.age;
        }
    };
    let ob2 = {
        name : "alice",
        age:34
    };
    let ob3 = {
        name : "kumar",
        age:22
    }
    let x = ob1.fullname.bind(ob3);
    console.log(x());
