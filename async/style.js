function callback(){
    alert('Coming from the callback')
}

function highOrder(fn){
    alert('before callback')
    fn()
    alert('after callback')
}

function call(e){
    e.preventDefault()
    highOrder(callback)
}


var p1 = new Promise(function(resolve, reject){
    // resolve([1,2,3,4])
    reject('Error')
})

p1.then(function(arr){
    console.log(arr)
}).catch(function(data){
    console.log('promise p1 was rejected with data:', data)
})

