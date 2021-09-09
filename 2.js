function search(number1,number2){
    var array = [32,97,71,85,10,20,67,2,41,52];
    // Menampilkan array yang diurutkan
    var arrayNew = array.sort(function(a, b){return a - b});

    // Membuat array yang berisi angka di dalam range
    var targetArray = [];
    for (number of array) {
        if(number >= number1 && number <= number2){
            targetArray.push(number);
        }
    }
// console.log(arrayNew);
console.log("Data range " +number1+ " sampai " +number2+ " = " + targetArray );
}

search(20,45);
