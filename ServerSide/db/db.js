const mongoose = require("mongoose");
require("dotenv").config();
require("express-session");
const encryptpwd = require("encrypt-with-password");
const dbo = require("../db/connection");
const { Key } = require("tokeylic-gen");
const { validationResult } = require("express-validator");
const { Invoice } = require("./schemas/InvoiceSchema");
const { Client } = require("./schemas/ClientSchema");
const { User } = require("./schemas/UserSchema");
const { registerMailSender, messageEmail } = require("../db/emailSender");
const { connection } = require("./mongo_conn");
const { buildPDF } = require("../pdf/invoiceGenerator");

// ADD USER *****
const addUser = (req, response) => {
const key = new Key().gen();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    response.json({ message: errors });
  } else {
    const encrypted = encryptpwd.encrypt(req.body.pass, process.env.ENCRYPT_PASS);
    return new Promise((resolve, reject) => {
      connection()
        .then(() => {
          let user = new User({
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.mail,
            password: encrypted,
            isVerified: false,
            Token: key,
            logoAvatar: Date.now(),
          });
          user.save()
            .then((result) => {
              registerMailSender(req.body.fName, req.body.mail, key)
                .then((ans) => console.log("mail ans", ans))
                .catch((error) => console.log("Email error", error));
              response.json("User added, confirm the link from your Email");
              console.log("Result log", result);
              resolve(result);
            })
            .catch((e) => {
              console.log("inner catch log", e);
              if (e.code === 11000) {
                response.json({
                  message: { errors: [{ msg: `Email "${e.keyValue.email}" already exists. Please login` }] },
                });
              }
            });
        })
        .catch((e) => console.log("first catch log", e));
    });
  }
};

// VERIFY USER *****
const verifyUser = (req, res) => {
  const db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .updateOne({ Token: req.query.id }, { $set: { Token: "Do not need token", isVerified: true } }, (err, result) => {
      console.log(req.query.id);
      console.log(result);
      if (err) throw err;
      if (result.modifiedCount === 1) {
        res.send(
          '<h1 style="padding: 2rem; text-align: center;" >User verified</h1> <h3 style="padding: 2rem; text-align: center;" >Thank you</h3>'
        );
      } else {
        res.send('<h1 style="padding: 2rem; text-align: center;" >Invalid Link</h1>');
      }
    });
};

// LOGIN USER *****

const loginUser = (req, res) => {
  const db_connect = dbo.getDb();
  db_connect.collection("users").findOne({ email: req.body.mail }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ error: "User does not exist, please enter correct Email and Password" });
    } else {
      const dec = encryptpwd.decrypt(user.password, process.env.ENCRYPT_PASS);
      if (!user.isVerified) {
        res.json({ error: "User is not Verified, Please check your Email" });
      } else if (dec !== req.body.pass) {
        res.json({ error: "Wrong Password" });
      } else {
        req.session.user = {
          fName: user.fName,
          lName: user.lName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          houseNumber: user.houseNumber,
          city: user.city,
          zip: user.zip,
          country: user.country,
          bank: user.bank,
          iban: user.iban,
          bic: user.bic,
          logoAvatar: user.logoAvatar,
        };
        res.json({ message: "success" });
      }
    }
  });
};

// render Dashboard

const checkSession = async (req, res) => {
  console.log("req.session.user", req.session.user);
  if (req.session.user) {
    try{
      await connection();
      const user = await User.findOne({email: req.session.user.email})
      let data = {
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        phone: user.phone,
        city: user.city,
        zip: user.zip,
        bank: user.bank,
        iban: user.iban,
        bic: user.bic,
        address: user.address,
        country: user.country,
        houseNumber: user.houseNumber,
        
      }
      res.json({ message: data });
    } catch (e) {console.log(e)}
  } else {
    res.json({ error: "session is expired" });
  }
};

//Create Invoice

const createInvoice = async (req, res) => {
  try {
    await connection();
    //Check list of clients
    const findUser = await User.findOne({ email: req.session.user.email}).populate({path: 'clients'})
    if(findUser){
      const clients = []
      findUser.clients.map(cl => {
        if(cl.email == req.body.info.email){
          clients.push(cl)
        }});
        const findClient = clients.find(c => !c.hidden);
      console.log('client find: ', findClient);
      if(findClient) {
        await Invoice.create(req.body.invoice, (error, result) => {
          if (error) {
            console.log('invoice error: ', error);
          } else {
            //this saves the ID of the client to the invoice
            result.client_id = mongoose.Types.ObjectId(findClient._id);
            result.save();
            findClient.invoices.push(result._id);
            findClient.save();
          }
        });
        res.json({message: 'done'})
        return;
      } else {
          res.json({error: "client not found"})
    }
  } else {
    res.json({error: "user not found"})
  }
} catch (error) {
    console.log('catch error: ', error);
  }
};

// LOAD USER INVOICES ************

const myInvoices = async (req, res) => {
  try {
    await connection();
    User.findOne({email: req.session.user.email})
      .populate({
        path: "clients",
        populate: {
          path: "invoices"
        },
      })
      .exec(function (err, data) {
        if (err) {
          console.log('err', err);
        } else {
          let invoices = [];
          data.clients.map(c => c.invoices.map(i => {if(!i.hidden) {invoices.push(i)}}))
          console.log(invoices);
         res.json(invoices);
        }
      });
  } catch (e) {
    console.log('catch error: ', e);
  }
};

// DOWNLOAD INVOICE ****************************

const downloadInvoice = async (req, res) => {
  console.log('invoice id', req.body.string)
  try {
    await connection();
    const findUser = await User.findOne({ email: req.session.user.email });
    const findInvoice = await Invoice.findOne({ _id: req.body.string });
    const findClient = await Client.findOne({_id: findInvoice.client_id});

    if(findClient && findInvoice && findInvoice) {
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment;filename=yourInvoice.pdf`,
      });
  
      buildPDF(
        (chunk) => stream.write(chunk),
        () => stream.end(),
        findUser,
        findInvoice,
        findClient
      );
    } else {
      res.json({error: "Something went Wrong!"})
    }
  } catch (e) {
    console.log('download invoice catch: ', e);
  }
};


// Delete Invoice ********************

const deleteInvoice = async (req, res) => {
try{
  await connection();
  await Invoice.updateOne({_id: req.body.string}, {hidden: true})    
  res.json({message: 'done'})
} catch(e) {console.log('catch error', e)}
}

// GET CLIENTS *********************

const getClients = async (req, res) => {
  try{
    await connection();
    User.findOne({email: req.session.user.email})
      .populate({
        path: "clients",
      })
      .exec(function (err, data) {
        if (err) {
          console.log('err', err);
        } else {
          console.log(data.clients)
          let clients = [];
          data.clients.map(c => {
            if(!c.hidden) {
              clients.push(c)
            }
          })
         res.json(clients);
        }
      });
  } catch (e) {console.log('catch error', e)}
}

// Delete Client **********************************

const deleteClient = async (req, res) => {
  try{
    await connection();
    const updated = await Client.findOneAndUpdate({_id: req.body._id}, {hidden: true});
    console.log(updated);
    res.json({message: 'done'})

  } catch(e){console.log('catch error:', e)}
}
// LOGOUT ****************************

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.json({ error: "error" });
    }
    res.json("success");
    console.log("from logout", req.session);
  });
};

// NEW MESSAGE *************

const newMessage = (req, res) => {
  let data = {
    sender: req.body.name,
    email: req.body.email,
    messages: [{ message: req.body.message, sentOn: req.body.sentOn }],
  };
  const db_connect = dbo.getDb();
  db_connect.collection("Messages").findOne({ email: data.email }, (fError, fResult) => {
    if (fError) throw fError;
    if (!fResult) {
      console.log(fResult);
      db_connect.collection("Messages").insertOne(data, (err, result) => {
        if (err) throw err;
        if (result) {
          messageEmail(req.body.name, req.body.email, req.body.message)
            .then((e) => {
              console.log(e);
              res.json("done");
            })
            .catch((e) => console.log("insert email catch:", e));
        }
      });
    } else {
      db_connect
        .collection("Messages")
        .updateOne(
          { email: req.body.email },
          { $push: { messages: { message: req.body.message, sentOn: req.body.sentOn } } },
          (err, result) => {
            if (err) throw err;
            if (result) {
              messageEmail(req.body.name, req.body.email, req.body.message)
                .then((e) => {
                  console.log(e);
                  res.json("done");
                })
                .catch((e) => console.log("update email catch:", e));
            }
          }
        );
    }
  });
};
// UPDATE USER ***********************************************************

const updateUser = (req, res) => {
  let data = {
    fName: req.body.fName,
    lName: req.body.lName,
    address: req.body.address,
    phone: req.body.phone,
    address: req.body.address,
    houseNumber: req.body.houseNumber,
    city: req.body.city,
    zip: req.body.zip,
    bank: req.body.bank,
    iban: req.body.iban,
    bic: req.body.bic,
    country: req.body.country,
  };
  const db_connect = dbo.getDb();
  db_connect.collection("users").updateOne({ email: req.body.email }, { $set: { ...data } }, (err, result) => {
    console.log(result);
    if (err) throw err;
    if (result.modifiedCount > 0) {
      res.json({message: "Information updated"});
    } else if(result.matchedCount > 0) {
      res.json({message: "Nothing to update"});
    } else {
      res.json({error: 'No match found'})
    }
  });
};


// Add Expenses ************************************************************


const addExpenses = async(req, res) => {
  try{
    await connection();
    const findUser = await User.findOne({email: req.session.user.email});
    if(findUser) {
      findUser.expenses.push(req.body.data);
      findUser.save();
      res.json({message: 'Expense added'});
    } else {
      res.json({error: 'User not found'})
    }

  } catch(e) {console.log('catch error', e)}
}


// Get expenses ****************************************************************

const getExpenses = async (req, res) => {
  try{
await connection();
const findUser = await User.findOne({email: req.session.user.email});
if(findUser) {
  let exp = [];
  findUser.expenses.map(ex => {
    if(!ex.hidden) {
      exp.push(ex)
    }
  })
  res.json({data: exp});
} else {
  res.json({error: 'User not found'})
}
  } catch(e) {console.log('catch error:', e)}
}

// Delete expense *******************************
const deleteExpense = async (req, res) => {
  console.log('id', req.body.id)

  try{
    await connection();
    const findUser = await User.findOne({email: req.session.user.email});
    if(findUser) {
      const updated = findUser.expenses.map(ex => {
        if(ex.id === req.body.id){
          return{...ex, hidden: true}
        }
        return ex
      })
      console.log(updated) ;
      findUser.expenses = updated;
      findUser.save()
      res.json({data: findUser.expenses});
    } else {
      res.json({error: 'User not found'})
    }
  } catch(e){console.log('catch', e)}
}

// Add client **********************************************

const addClient = async(req, res) => {
  try{
    await connection();
    const findUser = await User.findOne({ email: req.session.user.email}).populate({path: 'clients'})
    if(findUser){
      const findClient = findUser.clients.find(cl => cl.email == req.body.info.email);
      console.log('client find: ', findClient);
      if(findClient) {
        if(!findClient.hidden) {
          res.json({error: {Message: {message: 'Client with this email address already exists.'}}})
          return;
        } else {
          //If the client is hidden, create another one
        await Client.create(req.body.info, (error, result) => {
          if (error) {
            console.log('client error: ', error);
            res.json({'error': error.errors})
          } else {
            //recall function. This time Client exists and it will find it to add the invoice to its array
            console.log("Created Client");
            findUser.clients.push(result._id);
            findUser.save();
            res.json({message: "client added"})
        }
     });

        }
      } else {
        //If the client doesn't exist, create it
        await Client.create(req.body.info, (error, result) => {
          if (error) {
            console.log('client error: ', error);
            res.json({'error': error.errors})
          } else {
            //recall function. This time Client exists and it will find it to add the invoice to its array
            console.log("Created Client");
            findUser.clients.push(result._id);
            findUser.save();
            res.json({message: "client added"})
        }
     });
    }
  } 

  } catch(e){console.log('catch error', e)}

}
module.exports = {
  addUser,
  verifyUser,
  loginUser,
  checkSession,
  logOut,
  newMessage,
  updateUser,
  createInvoice,
  myInvoices,
  downloadInvoice,
  deleteInvoice,
  addClient,
  getClients,
  deleteClient,
  addExpenses,
  getExpenses,
  deleteExpense,
};
