import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

//sign in
export function signInAdmin(credentials){
    return new Promise((resolve,reject)=>{
        axios.post('/api/admin/signin',credentials).then((user)=>{
            console.log('doctor addedd successfully');
            resolve(user)
        }).catch((err)=>{
            console.log(err);
            reject(err)
        })
    })
}

//all doctors
export async function listDoctors(){
    try {
        return await axios.get('/api/admin/allDoctors');
    } catch (error) {
        console.log(error);
        return error
    }
}

//add doctor
export function addDoctor(credentials){
    return new Promise((resolve,reject)=>{
        axios.post('/api/admin/addDoctor',credentials).then((response)=>{
            resolve(response);
        }).catch((err)=>{
            console.log(err);
            reject(err)
        })

    })
}

//all departments
export async function getAllDepartments(){
    try {
        return await axios.get('/api/admin/departments')
    } catch (error) {
        console.log(error);
        return error;
    }
}

//add departments
export function createDepartments(credentials){
    return new Promise((resolve,reject)=>{
        axios.post('/api/admin/addDepartment',credentials).then((data)=>{
            resolve(data);
        }).catch(err =>{
            reject(err)
        })

    });
}

//get all patients
export function getAllPatients(){
    return new Promise((resolve,reject)=>{
        axios.get('/api/admin/patients').then((user)=>{
            console.log(user,">>>>>>>");
            resolve(user)
        }).catch((err)=>{
            reject(err)
        })
    })
}