const express = require('express');
const Document = require('mongoose');

// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

const Employee = require('../model/empl');

const router = express.Router();
const mongoose=require('mongoose');
const checkAuth = require('../middleware/check-auth');

let users =[]

router.get('/',checkAuth,async(req,res)=>{
    // console.log(users);
    // res.send('welcomen user');
    // res.send(users);
    await Employee.find()
    .then(result=>{
        res.status(200).json({
           employeeData:result 
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

router.post('/',checkAuth,(req,res)=>{
    // console.log('POST ROUTE REACH');
    
    const user = req.body;
    // const uuidv4 = uuid.v4();
    users.push({ ...user,id: uuidv4() });
    console.log(uuidv4);

    // users.push(user);


        //data storing in mongoose ---------
    const employee = new Employee({
        // _id:mongoose.Schema.Types.ObjectId,
        name:user.name ,
        jobtitle:user.jobtitle,
        salary:user.salary,
        address:user.address,
        contact:user.contact
    })

    employee.save().then(result=>{
        console.log(result);
        // res.status(200).json({
        //     newEmployee:result
        // })
    })
    .catch(err=>{
        console.log(err);
        // res.status(500).json({
        //     error:err
        // })
    })

    // console.log(req.body);
    res.send(`user with the name ${user.name}`);

});




// /users/2 => req.params { id:2 }
router.get('/:id',(req,res)=>{
// const { id }=req.params;
// const foundUser = users.find((user) => user.id == id);
//     res.send(foundUser);

    console.log(req.params.id);
    Employee.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            employee:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

router.delete('/:id',(req,res,next)=>{
    // const { id } =req.params;
    // users=users.filter((user)=> user.id != id );
    // res.send(`User with the id ${id} delet from database`)

    Employee.findByIdAndRemove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'Employee data delete',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

//patch method use to update and put method use for override 
// router.patch('/:id',(req,res,next)=>{
//     const{ id }= req.params;

//     //receive data
//     const { name , jobtitle,salary,address,contact}= req.body;
//     const user = Employee.findOne((user)=> user.id == id);

//     if(name){
//         user.name= name;
//     }
//     if(jobtitle){
//         user.jobtitle= jobtitle;
//     }
//     if(salary){
//         user.salary= salary;
//     }
//     if(address){
//         user.address= address;
//     }
//     if(contact){
//         user.contact= contact;
//     }

//     res.send(`User with the id ${id} has been updated`);  
// });

router.patch('/:id',(req,res,next)=>{
    console.log(req.params.id);
    const user = req.body;

    Employee.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:user.name ,
            jobtitle:user.jobtitle,
            salary:user.salary,
            address:user.address,
            contact:user.contact
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_product:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

module.exports = router;