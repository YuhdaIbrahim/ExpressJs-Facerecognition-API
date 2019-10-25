//jshint esversion:6

const handleSignin = (req, res, db, bcrypt) => {
  const { email , password} = req.body;
  if(!email || !password){
    return res.status(400).json('incorrect form!');
  }
 db.select('email', 'hash').from('login')
 .where('email', email)
 .then(data => {
   const isValid = bcrypt.compareSync(password, data[0].hash);
   if(isValid){
     return db.select('*').from('users')
     .where('email', '=', email)
     .then(user => {
       res.json(user[0]);
     })
     .catch(err => res.status(400).json('cannot sign in!'));
   } else{
     res.status(400).json('wrong user');
   }
 })
 .catch(err => res.status(400).json('something wrong!'));
};


module.exports ={
  handleSignin: handleSignin
};
