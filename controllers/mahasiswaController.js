import db from "../../koneksi.js"

export const getMahasiswa = (req, res) => {

  // select semua data dari table mahasiswa
  // res.send("ayyayy lucuuu");
  const sql = "SELECT * FROM mahasiswa";
  // mengirim query ke db mysql
  db.query(sql, (error, result) => {
    //mengirim data ke client browser
    res.send(result);
  });
};

// Ekspor fungsi getMahasiswa

export const getMahasiswaByNim = (req, res) => {
// menangkap data query url
  const nim = req.query.nim;
  // menangkap semua data dari table mahasisea berdasarkan nim
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (erorr, result) => {
    res.json(result);
  });
};

export const createMahasiswa = (req, res) => {
  const { nim, nama, kelas, alamat } = req.body;
  // insert ke mahasiswa dengan nilai nim, nama, kelas, alamat dari body
  const sql =
    "INSERT INTO mahasiswa (nim, nama, kelas, alamat) VALUES (?,?,?,?)";
  db.query(sql, [nim, nama, kelas, alamat], (error, result) => {
    if (error) {
      // jika ada error
      res.status(400);
      res.send(error);
    }
    // jika tidak ada error
    res.status(201);
    res.json(result);
  });
}

export const updateMahasiswa = (req, res) => {
  const nim = req.query.nim;

  // menangkap req body
  const { nama, kelas, alamat } = req.body;
  // mengecek nim, nama
  if (nim || nama || kelas || alamat) {
    // query Update table mahasiswa
    const query = `Update mahasiswa SET nama = "${nama}", kelas = "${kelas}", alamat = "${alamat}" WHERE nim = ${nim}`;
    //mengirim query ke database
    db.query(query, (error, result) => {
      if (error) res.status(400).send(error.message);

      res.json(result);
    });
  } else {
    res.send("isi body nya");
  }
}

export const  deleteMahasiswa = (req, res) => {
  const nim = req.query.nim;
  const sql = "DELETE FROM mahasiswa WHERE nim = ?";
  db.query(sql, [nim], (error, result) => {
    if (error) {
      res.status(400);
      res.send(error);
    }
    res.status(200);
    res.json("data berhasil dihapus");
  });
}
