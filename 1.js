// Untuk deklarasi golongan
const A = "A";
const B = "B";
const C = "C";
const D = "D";

function gajiKaryawan(golongan,jamKerja) {

// Kondisional untuk mendapatkan nilai upah dasar sesuai golongan
    switch(golongan) {
        case A:
            upahDasar = 5000;
            break;
        case B: 
            upahDasar = 7000;
            break;
        case C:
            upahDasar = 8000;
            break;
        case D:
            upahDasar = 10000;
            break;
    }

// Membuat hasil output ada tanda ribuan (dipisahkan titik)
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

// Menghitung Upah
    var upah = upahDasar*jamKerja;
    var displayUpah = numberWithCommas(upah);

// Kondisional dan menghitung lembur
    var lembur = "";
    if(jamKerja > 48){
        lembur = (jamKerja-48)*4000;
    } else if(jamKerja < 50) {
        lembur = 0;
    }
    var displayLembur = numberWithCommas(lembur);

// Menghitung total gaji
    var gaji = upah + lembur;
    var displayGaji = numberWithCommas(gaji);

// Menampilkan hasil perhitungan ke consol
    console.log('Golongan : ' + golongan);
    console.log('Jam kerja : ' + jamKerja);
    console.log('Upah : Rp. ' + displayUpah);
    console.log('Uang lembur : Rp. ' + displayLembur);
    console.log('Gaji : Rp. ' + displayGaji);

}

// Untuk input fungsi

gajiKaryawan(C,53);