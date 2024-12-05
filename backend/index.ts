require('dotenv').config();
const Mysql = require('mysql2');
const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

const app = express();
app.use(cors({
		origin: ['http://localhost:3000'],
		methods: ["POST", "GET"],
		credentials: true
	}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(fileUpload());

const PORT = process.env.PORT || 3000;

const DB = Mysql.createConnection({
	host:'localhost',
  user:process.env.user,
  password:process.env.password,
  database:process.env.database
})

const verifyUser = (req, res, next) => {
	const token = req.cookies.token;
	if(!token){
		return res.json({Error: "Вы не прошли проверку авторизации"});
	}else{
		jwt.verify(token, "jwt-secret_key", (err, decoded) => {
			if(err){
				return res.json({Error: "Вы не прошли проверку токена"});
			}else{
				req.Phone = decoded.Phone;
				req.IdUser = decoded.idUser;
				req.LastName = decoded.LastName2
				next(); 
			}})}}

app.get('/Home', verifyUser, (req, res) => {
	return res.json({Status: "Success",Phone: req.Phone,IdUser: req.IdUser,LastName: req.LastName});
})

app.post('/signup', (req, res) => {
	const sql = "INSERT INTO users (`FirstName`, `LastName`, `Phone`, `Email`, `Password`, `DateRegist`) VALUES (?)";
	bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
		if (err) return res.json({Error: "Invalid password"});
		const values = [req.body.FirstName, req.body.LastName, req.body.Phone, req.body.Email, hash, req.body.DateRegist]
			DB.query(sql, [values], (err, data) => {
				if(err){
					return res.json(err);
				}else{
					return res.json({Status: "Success"});
				}})})})

app.post('/login', (req, res) => {
	const sql = "SELECT * FROM users WHERE `Phone` = ?";
	DB.query(sql, [req.body.Phone], (err, data) => {
		if(err){
			return res.json({Error: "Телефон не найден"});
		}
			if(data.length > 0 ){
				bcrypt.compare(req.body.Password.toString(), data[0].Password, (err, response) => {
					if(err) return res.json({Error: "Ошибка при сравнение паролей"});
					if(response){
						const idUser = data[0].id;
						const LastName2 = data[0].LastName;
						const Phone = data[0].Phone;
						const token = jwt.sign({Phone,idUser,LastName2}, "jwt-secret_key", {expiresIn: '1d'});
						res.cookie('token', token);
						return res.json({Status: "Success"});
					}else{
						return res.json({Error: "Неверный пароль"});
					}
				})
			}else{
				return res.json("Не удалось войти");
}})})

app.post('/ValidPass', (req, res) => {
	const sql = "SELECT * FROM users WHERE `id` = ?";
	DB.query(sql, [req.body.id], (err, data) => {
		if(err){
			return res.json({Error: "Пользователь не найден"});
		}
			if(data.length > 0 ){
				bcrypt.compare(req.body.Password.toString(), data[0].Password, (err, response) => {
					if(err) return res.json({Error: "Ошибка при сравнение паролей"});
					if(response){
						return res.json({Status: "Success"});
					}else{
						return res.json({Error: "ERROR"});
					}
				})
			}
})})

app.post('/UpdatePass', (req, res) => {
	const sql = "UPDATE users SET Password = ? WHERE id = ?";
	bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
		if (err) return res.json({Error: "Invalid password"});
		const values = [hash, req.body.id]
			DB.query(sql, values, (err, data) => {
				if(err){
					return res.json(err);
				}else{
					return res.json({Status: "Success"});
}})})})

app.get('/UsersAll', (req, res) => {
	const sql = 'SELECT * from users';
	DB.query(sql, (err,data) =>{
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.post('/DeleteUser', (req, res) => {
	const sql = 'DELETE FROM users WHERE id= ?';
	DB.query(sql, [req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({STATUS: 'TRUE'})
	})
})

app.post('/UsersUpdatePhone', (req, res) => {
	const sql = 'UPDATE users SET Phone = ? WHERE id = ?';
	const value = [req.body.Phone, req.body.id]
	DB.query(sql, value ,(err,data) =>{
		if(err) return res.json(err)
			return res.json({STATUS: 'TRUE'})
	})
})

app.post('/UsersUpdateEmail', (req, res) => {
	const sql = 'UPDATE users SET Email = ? WHERE id = ?';
	const value = [req.body.Email, req.body.id]
	DB.query(sql, value ,(err,data) =>{
		if(err) return res.json(err)
			return res.json({STATUS: 'TRUE'})
	})
})

app.get('/ListProduction', (req:string, res:any) => {
	const sql = 'SELECT * from Production';
	DB.query(sql, (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.post('/AddProduct', (req,res) => {
	const sql = 'INSERT INTO Production (title, article, materials, quantity, img, description, price, newStatus, idNavMenu) VALUE (?)';
	const value = [req.body.title, req.body.article, req.body.materials, req.body.quantity, req.body.img, req.body.description, req.body.price, req.body.newStatus, req.body.idNavMenu]
	DB.query(sql, [value], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: "TRUE"})
	})
})

app.post('/AutoIncrProduction', (req, res) => {
	const sql = "ALTER TABLE Production AUTO_INCREMENT = ?";
	DB.query(sql, [req.body.value], (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.post('/UpdateProduction', (req, res:any) => {
	const sql = 'UPDATE Production SET title = ?, article = ?, materials = ?, quantity = ?,  description = ?, price = ?, newStatus = ?, idNavMenu = ? WHERE id = ? ';
	const value = [req.body.title, req.body.article, req.body.materials, req.body.quantity, req.body.description, req.body.price, req.body.newStatus, req.body.idNavMenu, req.body.id]
	DB.query(sql, value ,(err, data) => {
		if(err) return res.json(err)
			return res.json({Status: "TRUE"})
	})
})

app.post('/UpdateProductionQuantity', (req, res:any) => {
	const sql = 'UPDATE Production SET quantity = ? WHERE id = ?';
	const value = [req.body.quantity, req.body.id]
	DB.query(sql, value, (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: 'TRUE'})
	})
})
app.post('/UpdateImgMain', (req, res) => {
	const sql = 'UPDATE Production SET img = ?  WHERE  id = ?';
	DB.query(sql, [req.body.img, req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: "TRUE"})
	})
})

app.get('/ListImgGallery', (req:string, res:any) => {
	const sql = 'SELECT * from galleryProduct';
	DB.query(sql, (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.post('/AddImgGallery', (req, res:any) => {
	const sql = 'INSERT INTO galleryProduct (Link, idProduction) VALUE (?)';
	const value = [req.body.Link, req.body.idProduction]
	DB.query(sql, [value] ,(err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})


app.post('/UpdateImgGallery', (req, res) => {
	const sql = 'UPDATE galleryProduct SET Link = ?  WHERE  id = ?';
	DB.query(sql, [req.body.Link, req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: "TRUE"})
	})
})

app.get('/ListNavMenu', (req:string, res:any) => {
	const sql = 'SELECT * FROM ListNavigationMenu';
	DB.query(sql, (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.post('/UpdateListNavMenu', (req, res:any) => {
	const sql = 'UPDATE ListNavigationMenu SET Name = ?, Link = ? WHERE id = ?';
	const value = [req.body.Name, req.body.Link, req.body.id]
	DB.query(sql, value, (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: 'TRUE'})
	})
})

app.post('/AddListNavMenu', (req, res) => {
	const sql = 'INSERT INTO ListNavigationMenu (Name, Link) VALUE (?)';
	const value = [req.body.Name, req.body.Link]
	DB.query(sql, [value], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: 'TRUE'})
	})
})

app.post('/DeleteNavMenu', (req, res) => {
	const sql = 'DELETE FROM ListNavigationMenu WHERE id= ?';
	DB.query(sql, [req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({STATUS: 'TRUE'})
	})
})


app.post('/ListFavoritesProduct', (req, res) => {
	const sql = 'SELECT * FROM `UserFavoritesProduct` WHERE `idUser` = ?';
	DB.query(sql, req.body.idUser, (err, data) => {
		if(err) return res.json(err)
			return 	res.json(data)
	})
})

app.post('/ListDeleteFavoritesProd', (req, res) => {
	const sql = 'DELETE FROM UserFavoritesProduct WHERE idProd = ? and idUser = ?';
	DB.query(sql, [req.body.idProd, req.body.idUser], (err, data) => {
		if(err) return res.json(err)
			return res.json({STATUS: 'TRUE'})
	})
})

app.post('/ListInsertFavoritesProd', (req, res) => {
	const sql = 'INSERT INTO UserFavoritesProduct (title, article, materials, quantity, img, description, price, newStatus, idNavMenu, idUser, idProd) VALUE (?)';
	const value = [req.body.title, req.body.article, req.body.materials, req.body.quantity, req.body.img, req.body.description, req.body.price, req.body.newStatus, req.body.idNavMenu, req.body.idUser, req.body.idProd]
	DB.query(sql, [value], (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})


app.post('/AddOrder', (req, res) => {
	const sql = 'INSERT INTO OrderUsers (img, title, article, quantity, price, Delivery, Pickup, Address, idPostal, Status, PaymentStatus, idUser, DateOrder, Cancel) VALUE (?)';
	const value = [req.body.img, req.body.title, req.body.article, req.body.quantity, req.body.price, req.body.Delivery, req.body.Pickup, req.body.Address, req.body.idPostal, req.body.Status, req.body.PaymentStatus, req.body.idUser, req.body.DateOrder]
	DB.query(sql, [value], (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.post('/UpdateStatusOrder', (req, res) => {
	const sql = 'UPDATE OrderUsers SET Status = ?, totalAmount = ? WHERE id = ?';
	DB.query(sql, [req.body.Status, req.body.totalAmount,  req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: 'TRUE'})
	})
})

app.post('/UpdatePaymentStatusOrder', (req, res) => {
	const sql = 'UPDATE OrderUsers SET Status = ?, PaymentStatus = ? WHERE id = ?';
	DB.query(sql, [req.body.Status, req.body.PaymentStatus, req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: 'TRUE'})
	})
})

app.post('/CancelOrder', (req, res) => {
	const sql = 'UPDATE OrderUsers SET Cancel = ? WHERE id = ?';
	DB.query(sql, [req.body.Cancel, req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: 'TRUE'})
	})
})

app.post('/SelectOrder', (req, res) => {
	const sql = 'SELECT * FROM OrderUsers WHERE idUser = ?';
	DB.query(sql, req.body.idUser ,(err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.get('/SelectOrderAll', (req, res) => {
	const sql = "SELECT * FROM OrderUsers";
		DB.query(sql, (err, data) => {
			if(err) return res.json(err)
				return res.json(data)
		})
})

app.post('/DeleteProdBasket', (req, res) => {
		const sql = 'DELETE FROM Basket WHERE id = ? and idUser = ?';
		DB.query(sql, [req.body.id, req.body.idUser], (err, data) => {
			if(err) return res.json(err)
				return res.json({STATUS: 'TRUE'})
		})
	})

app.post('/UploadFile', (req, res) => {
	if(!req.files){
		return res.json({Status: "file is not found"})
	}
	const MyFile = req.files.file;

	MyFile.mv(`${__dirname}/public/Product/${MyFile.name}`,
		function (err){
			if(err){
				console.log(err)
				return res.json({Status: "Error occurred"});
			}
			return res.send({name: MyFile.name, path: `Product/${MyFile.name}`})
		}
	)
})


app.get('/SelectNews' , (req, res) => {
	const sql = 'SELECT * FROM NewsInform ORDER BY date DESC ';
	DB.query(sql, (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.get('/SelectNewsLimit' , (req, res) => {
	const sql = 'SELECT * FROM NewsInform ORDER BY date DESC LIMIT 3';
	DB.query(sql, (err, data) => {
		if(err) return res.json(err)
			return res.json(data)
	})
})

app.post('/UpdateNews', (req, res) => {
	const sql = 'UPDATE NewsInform SET title = ?, description = ?, date = ? WHERE id = ?';
	DB.query(sql, [req.body.title, req.body.description, req.body.date, req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status : 'TRUE'})
	})
})

app.post('/DeleteNews', (req, res) => {
	const sql = 'DELETE FROM NewsInform WHERE id = ?';
	DB.query(sql, [req.body.id], (err, data) => {
		if(err) return res.json(err)
			return res.json({STATUS: 'TRUE'})
	})
})

app.post('/AddNews', (req, res) => {
	const sql = 'INSERT INTO NewsInform (title, description, date) VALUE (?)';
	const value = [req.body.title, req.body.description, req.body.date];
	DB.query(sql, [value], (err, data) => {
		if(err) return res.json(err)
			return res.json({Status: "TRUE"})
	})

})

//Выход
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})

