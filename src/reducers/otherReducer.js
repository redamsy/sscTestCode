const initState = {
    posts: [{id:'1', name:'post1'},{id:'2', name:'post2'}],
    cars:[],
    rentals:[],
    rentaltypeOptions:[],
    modelOptions:[],
    makeOptions:[],
    fuelOptions:[],
    typeOptions:[],
    colorOptions:[],
    statusOptions:[],
    customerOptions:[]
}
const otherReducer = (state = initState, action) => {
    switch(action.type){
        case 'INITIALIZE_ALL':
            
            return{
                ...state,
                cars:[...action.initializations[1].data.data],
                rentals:[...action.initializations[2].data.data],
                rentaltypeOptions:[...action.initializations[3].data.data],
                modelOptions:[...action.initializations[4].data.data],
                makeOptions:[...action.initializations[5].data.data],
                fuelOptions:[...action.initializations[6].data.data],
                typeOptions:[...action.initializations[7].data.data],
                colorOptions:[...action.initializations[8].data.data],
                statusOptions:[...action.initializations[9].data.data],
                customerOptions:[...action.initializations[10].data.data],
            }
        case 'CREATE_CAR':
            return{
                ...state,
                cars: [...state.cars, action.newcar]
            }
        case 'CREATE_RENTAL':
            return{
                ...state,
                rentals: [...state.rentals, action.newrental]
            }
        case 'CREATE_COLOR':
            return{
                ...state,
                colorOptions: [...state.colorOptions, action.newcolor]
            }
        case 'CREATE_FUEL':
            return{
                ...state,
                fuelOptions: [...state.fuelOptions, action.newfuel]
            }
        case 'CREATE_MAKE':
            return{
                ...state,
                makeOptions: [...state.makeOptions, action.newmake]
            }
        case 'CREATE_STATUS':
            return{
                ...state,
                statusOptions: [...state.statusOptions, action.newstatuse]
            }
        case 'CREATE_TYPE':
            return{
                ...state,
                typeOptions: [...state.typeOptions, action.newtype]
            }
        case 'CREATE_RENTALTYPE':
            return{
                ...state,
                rentaltypeOptions: [...state.rentaltypeOptions, action.newrentaltype]
            }
        case 'CREATE_MODEL':
            return{
                ...state,
                modelOptions: [...state.modelOptions, action.newmodel]
            }
        case 'CREATE_CUSTOMER':
            return{
                ...state,
                customerOptions: [...state.customerOptions, action.newcustomer]
            }
        case 'DELETE_car':
            let newCars = state.cars.filter(car => {
                return action.id !== car.id 
            })
            return {
                ...state,
                cars: newCars
            }
        case 'UPDATE_CAR':
            return{
                ...state,
                cars: [...state.cars, action.updatedCar]
            }
        default:
            return state;
    }
    
}
export default otherReducer;