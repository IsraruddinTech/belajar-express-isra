import express from "express";
import db from "./koneksi.js";
import bodyParser from "body-parser";
import router from "./routes/route.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT 

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   // select semua data dari table mahasiswa
//   // res.send("ayyayy lucuuu");
//   const sql = "SELECT * FROM mahasiswa";
//     // mengirim query ke db mysql
//   db.query(sql, (error, result) => {
//     //mengirim data ke client browser
//     res.json(result);
//   });
// });

// http://localhost:3000/find?nim=1001
// app.get("/find", (req, res) => {
//   // menangkap data query url
//   const nim = req.query.nim;
//   // menangkap semua data dari table mahasiswa berdasarkan nim
//   const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`;
//   // mengirim query ke database mysql
//   db.query(sql, (error, result) => {
//     // mengirim data hasil ke client browser
//     res.json(result);
//   });
// });

// http://localhost:3000/create
app.post("/create", (req, res) => {
  // menangkap body dari response yang dikirim oleh thunderclient
  const { nim, nama, kelas, alamat } = req.body;
  // inser ke mahasiswa dengan nilai nim, nama, kelas, alamat dari body
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
});

// http://localhost:3000/delete?nim=1001
app.delete("/delete", (req, res) => {
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
});

//user mengakses method put pada localhost:3000/update
app.put("/update", (req, res) => {
  // nim, query nim
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
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server berjalan di http://localhost:" + PORT);
});
