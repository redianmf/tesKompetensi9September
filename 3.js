function patternTriangle(string){

    var letters = [];
    for (letter of string) {
    letters.push(letter);
    }

    var letterArrays = [[letters[0]],[letters[1],letters[2]],[letters[3],letters[4],letters[5]],[letters[6],letters[7],letters[8],letters[9]]];
    
    // for (element of letterArrays) {
    //     console.log(element);
    // }

    var height = 4;
    for (var i = 0; i < height; i++) {

        var output = '';
        for (var j = 0; j < height - i; j++) output += ' ';
        for (var k = 0; k <= i; k++) output += letterArrays[i][k]+" ";

        console.log(output);
        // console.log(i);       
        // console.log(k);
        // console.log(j);
        
    }

}

patternTriangle("DUMBWAYSID");
// patternTriangle("0123456789");
// patternTriangle("NASIGORENG");