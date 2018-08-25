const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res){
    //Verify the user provide a phone
    if (!req.body.phone){
        res.status(422).send({error: 'You must provide a phone number'});
        return;
    }

    //Format the phone number to remove the slashes en parens
    const phone = String(req.body.phone).replace(/[^\d]/g,'');

    admin.auth().getUser(phone)
       .then(userRecord => {
          const code = Math.floor((Math.random() * 8999 + 1000 ));
          return twilio.message.create({
              body: 'your code is ' + code,
              to : phone,
              from : '+3197004498963'
          },(err) => {
              if (err) { return res.status(422).send(err); }

              return admin.database().ref('users/' + phone)
               .update({code: code, codeValid : true}, () => {
                  res.send({success : true});
               });
        
          });
       })
    .catch((err) => res.status(422).send({error : err}))

}