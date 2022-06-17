const {express, jsonParser, bcrypt, jwt, _, config} = require(ROOT_DIR + "/startup/exporter.js");

const {userDAO} = require(ROOT_DIR + "/startup/exporter.js");

const {adminDB, Sequelize} = require(ROOT_DIR + "/db.js");

const {auth, pagExt, isAdmin} = require(ROOT_DIR + "/startup/exporter.js");

const {timeParser} = require(ROOT_DIR + "/startup/exporter.js");

const router = express.Router();

router.post("/create", [jsonParser, auth, isAdmin] , async (req, res) => {
    const user = req.body.baseUser;
    const salt = await bcrypt.genSalt();
    user.password_hash = await bcrypt.hash(user.password_hash, salt);
    userDAO.createUser(user).then((createdUser)=>{
      res.status(200).send({created: _.pick(createdUser,['username']), status:true})
    }).catch(err=>{ res.status(200).send({created: false, 'error': err.message}); });
});

router.put('/edit/:id', [jsonParser, auth, isAdmin], async (req, res) => {
  userDAO.updateUser(req.body.baseUser, {where: {id: req.params.id}, raw: true})
  .then(() => res.status(200).send({'status': true}))
  .catch(err => res.send({'status': false, "error":err}));
});

router.delete('/delete/:id', [jsonParser, auth, isAdmin], async (req, res) => {
  userDAO.deleteUser({ where:{ id: req.params.id}, raw: true})
  .then(() => res.status(200).send({'status': true}))
  .catch(err => res.send({'status': false, "error":err}));
});

router.post("/login", [jsonParser], (req, res) => {
  userDAO.getUser({where: {username: req.body.username}, raw: true})
  .then(user=>{
    user.createdAt = timeParser(user.createdAt);
    user.updatedAt = timeParser(user.updatedAt);
    if(!user) { return res.status(400).send({message:"Пользователь не найден!"}); }
    const isValidPassword = bcrypt.compareSync(req.body.password, user.password_hash);
    if(isValidPassword)
    {
      const token = jwt.sign({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        territory_id: user.territory_id
      },config.get("jwtPrivateKey"),{expiresIn: '9h'});
      res.status(200).send({token:token})
    }
    else
    {
      res.status(400).send({message:'Имя или пароль неверный!'})
    }
  }).catch((err)=>{
    return res.status(403).send({message:"Ошибка системы, повторите вход"})
  });
});

router.get("/show", [ jsonParser, auth, pagExt] , async (req, res) => {

  let respData = {};
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);

  let search = JSON.parse(JSON.stringify(req.query));
  delete search.page;
  delete search.per_page;

  return adminDB.transaction( async function (t){

    let roleCheck = new Promise( async (resolve, reject) => {
      if(req.body.user.role == 'supervisor'){
        await userDAO.getUsers({where: search, transaction: t}, req.body.pagination, [['id', 'DESC']]).then( async users => {
          return resolve(users);
        });
      }
      else {
        return reject('Not authorized');
      }
    });

    await roleCheck.then( async (users) => {
      let pages = Math.ceil( users.count / req.body.pagination.limit);
      respData.users = users.rows;
      respData.pages = pages;
    }).then(function (result) {
      res.status(200).send({
        'status': true, 
        'data': _.takeWhile(respData.users, function(o) { delete o.password_hash; return o;}),
        'total': respData.pages
      });
    }).catch(function (err) {
      res.status(200).send({'status': false, 'error': err});
    });
  });

});

module.exports = router;
