const admin = require('firebase-admin')

module.exports = function(req, res){
  //Verify the user provide a phone
  if (!req.body.phone){
    res.status(422).send({ error: 'Bad input'});
    return;
  }

  //Format the phone number to remove the slashes en parens
  const phone = String(req.body.phone).replace(/[^\d]/g,"");

  //Create a new user account using that phone
  //Respond to the user request, saying the account was made
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({error : err}));
}