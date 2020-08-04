import axios from 'axios';
import authAxios from '../middlewares/interceptors/authAxios'
import otherAxios from '../middlewares/interceptors/otherAxios'
import history from '../services/history'
export function register({name, email, password, c_password}){
  return (dispatch, getState) => {
    authAxios({
      method:'post',
      url:'register',
      data:{
        'name':name,
        'email': email,
        'password': password,
        'c_password': c_password,
      }
    }).then((resp) => {
      dispatch({type: 'LOGIN'})
      localStorage.setItem('ssctestOauthAccessToken', resp.data.success.token);
      window.location.reload(true)
    })
  }
}
export function login({email, password}){
  return (dispatch, getState) => {
    authAxios({
      method:'post',
      url:'login',
      data:{
        'email': email,
        'password': password,
      }
    }).then((resp) => {
      dispatch({type: 'LOGIN'})
      localStorage.setItem('ssctestOauthAccessToken', resp.data.success.token);
      window.location.reload(true)
    })
  }
}
export function logout(){
  return (dispatch, getState) => {
    otherAxios({
      method:'post',
      url:'logout',
    }).then((resp) => {
      console.log(resp.data)
      if(resp.data.message==='success'){
        dispatch({type: 'LOGOUT'})
        history.push('/');
      }
    }) 
  }
}
export function getAllInitializations(){
  return (dispatch, getState) => {
    
    const me = otherAxios.get('me');
    const cars = otherAxios.get('cars');
    const rentals = otherAxios.get('rentals')
    const rentaltypes = otherAxios.get('rentaltypes')
    const models = otherAxios.get('models');
    const makes = otherAxios.get('makes');
    const fuels = otherAxios.get('fuels')
    const types = otherAxios.get('types')
    const colors = otherAxios.get('colors')
    const statuses = otherAxios.get('statuses')
    const customers = otherAxios.get('customers')
    Promise.all([me, cars, rentals, rentaltypes, models, makes, fuels, types, colors, statuses, customers]).then(axios.spread((...responses) => {
      if(responses){
        dispatch({type: 'INITIALIZE_HOST_INFO', host_info: responses[0].data.data})
        dispatch({type: 'INITIALIZE_ALL', initializations: responses})
        history.push('/');
      }
    })).catch(error => {
        console.log(error.response)
      })
  }
}
export const createCar = (newcar) => {
  return (dispatch, getState) => {
    //
    const formData = new FormData()
    for(var x = 0; x<newcar.file.length; x++) {
      formData.append('file[]', newcar.file[x])
    }
    formData.append('registration', newcar.registration);
    formData.append('chassis', newcar.chassis);
    formData.append('year', newcar.year);
    formData.append('capacity', newcar.capacity);
    formData.append('isAutomatic', newcar.isAutomatic? 1 : 0);
    formData.append('equipment', newcar.equipment);
    formData.append('flaw', newcar.flaw);
    formData.append('mileage', newcar.mileage);
    formData.append('model_id', newcar.model_id);
    formData.append('fuel_id', newcar.fuel_id);
    formData.append('type_id', newcar.type_id);
    formData.append('color_id', newcar.color_id);
    //rates
    formData.append('hourlyRate', newcar.hourlyRate);
    formData.append('dailyRate', newcar.dailyRate);
    formData.append('monthlyRate', newcar.monthlyRate);
    otherAxios({
        method:'post',
        url:'car',
        data:formData
    }).then((resp) => {
        dispatch({type: 'CREATE_CAR', newcar: resp.data.data})
        })
  }
}

export const createRental = (newrental) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'rental',
        data:{
          'pickupDate': newrental.pickupDate,
          'pickupTime': newrental.pickupTime,
          'returnDate': newrental.returnDate,
          'returnTime': newrental.returnTime,
          'isPaid': newrental.isPaid? 1 : 0,
          'car_id': newrental.car_id,
          'customer_id': newrental.customer_id,
          
        }
    }).then((resp) => {
          if(resp.data.message==='car not available')
            alert('car not available')
          else
            dispatch({type: 'CREATE_RENTAL', newrental: resp.data.data})
        }) 
  }
}
export const createColor = (newcolor) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'color',
        data:{
          'name': newcolor.color,
          
        }
    }).then((resp) => {
            dispatch({type: 'CREATE_COLOR', newcolor: resp.data.data})
        }) 
  }
}
export const createFuel = (newfuel) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'fuel',
        data:{
          'name': newfuel.fuel,
          
        }
    }).then((resp) => {
            dispatch({type: 'CREATE_FUEL', newfuel: resp.data.data})
        }) 
  }
}

export const createMake = (newmake) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'make',
        data:{
          'name': newmake.make,
          
        }
    }).then((resp) => {
            dispatch({type: 'CREATE_MAKE', newmake: resp.data.data})
        }) 
  }
}
export const createStatus = (newstatus) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'status',
        data:{
          'name': newstatus.status,
          
        }
    }).then((resp) => {
            dispatch({type: 'CREATE_STATUS', newstatus: resp.data.data})
        }) 
  }
}
export const createType = (newtype) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'type',
        data:{
          'name': newtype.type,
          
        }
    }).then((resp) => {
            dispatch({type: 'CREATE_TYPE', newtype: resp.data.data})
        }) 
  }
}
export const createRentaltype = (newrentaltype) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'rentaltype',
        data:{
          'name': newrentaltype.rentaltype,
          
        }
    }).then((resp) => {
            dispatch({rentaltype: 'CREATE_RENTALTYPE', newrentaltype: resp.data.data})
        }) 
  }
}
export const createModel = (newmodel) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'model',
        data:{
          'name': newmodel.model,
          'make_id':newmodel.make_id
          
        }
    }).then((resp) => {
            dispatch({type: 'CREATE_MODEL', newmodel: resp.data.data})
        }) 
  }
}
export const createCustomer = (newcustomer) => {
  return (dispatch, getState) => {
    //
    otherAxios({
        method:'post',
        url:'customer',
        data:{
          'name': newcustomer.customer,
          'contact':newcustomer.contact,
          'address':newcustomer.address,
          'credentials':newcustomer.credentials,
          
        }
    }).then((resp) => {
            dispatch({type: 'CREATE_CUSTOMER', newcustomer: resp.data.data})
        }) 
  }
}
export const updateCar = (updatedCar) => {
  return (dispatch, getState) => {
    //
    const formData = new FormData()
    formData.append('id', updatedCar.id);
    formData.append('registration', updatedCar.registration);
    formData.append('chassis', updatedCar.chassis);
    formData.append('year', updatedCar.year);
    formData.append('capacity', updatedCar.capacity);
    formData.append('isAutomatic', updatedCar.isAutomatic? 1 : 0);
    formData.append('equipment', updatedCar.equipment);
    formData.append('flaw', updatedCar.flaw);
    formData.append('mileage', updatedCar.mileage);
    formData.append('model_id', updatedCar.model_id);
    formData.append('fuel_id', updatedCar.fuel_id);
    formData.append('type_id', updatedCar.type_id);
    formData.append('color_id', updatedCar.color_id);
    //rates
    formData.append('hourlyRate', updatedCar.hourlyRate);
    formData.append('dailyRate', updatedCar.dailyRate);
    formData.append('monthlyRate', updatedCar.monthlyRate);
    otherAxios({
        method:'post',
        url:'car/'+updatedCar.id+'?_method=PUT',
        data:formData
    }).then((resp) => {
      console.log(resp)
            dispatch({type: 'DELETE_CAR', id:updatedCar.id})
            dispatch({type: 'UPDATE_CAR', updatedCar: updatedCar})
        }) 
  }
}

export const updateRental = (updatedRental) => {
  return (dispatch, getState) => {
    otherAxios({
      method:'post',
      url:'rental/'+updatedRental.id+'?_method=PUT',
      data:{
        'id': updatedRental.id,
        'pickupDate': updatedRental.pickupDate,
        'pickupTime': updatedRental.pickupTime,
        'returnDate': updatedRental.returnDate,
        'returnTime': updatedRental.returnTime,
        'addCharges': updatedRental.addCharges,
        'status_id': updatedRental.status_id,
        'isPaid': updatedRental.isPaid? 1 : 0,
        'car_id': updatedRental.car_id,
        'customer_id': updatedRental.customer_id,
      }
    }).then((resp) => {
        console.log(resp)
        dispatch({type: 'DELETE_RENTAL', id:updatedRental.id})
        dispatch({type: 'UPDATE_RENTAL', updatedRental: updatedRental})
      }) 
  }
}
