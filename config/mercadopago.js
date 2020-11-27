// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
  integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      id:1234,
      title: 'Iphone 8',
      description:'Dispositivo móvil de Tienda e-commerce',
      picture_url:'https://jsantoshb-mp-ecommerce-nodejs.herokuapp.com/assets/003.jpg',
      unit_price: 160,
      currency_id:'MXN',
      quantity: 1
    }
  ],
  external_reference:process.env.EMAIL,
  payer: {
        name: 'Lalo',
        surname: 'Landa',
        email: 'test_user_81131286@testuser.com',
        phone: {
            area_code: '52',
            number: '5549737300'
        },
        identification: {
            type: 'ID',
            number: "655253974"
        },
        address: {
            street_name: 'Insurgentes Sur',
            street_number: 1602,
            zip_code: '03940'
        }
    },
    payment_methods: {
        excluded_payment_methods: [
            {
                id: 'amex'
            }
        ],
        excluded_payment_types: [
            {
                id: 'atm'
            }
        ],
        installments: 6,
        default_payment_method_id: null,
        default_installments: 1
    },
    back_urls: {
        success: 'https://jsantoshb-mp-ecommerce-nodejs.herokuapp.com/success',
        pending: 'https://jsantoshb-mp-ecommerce-nodejs.herokuapp.com/pending',
        failure: 'https://jsantoshb-mp-ecommerce-nodejs.herokuapp.com/failure'
    },
    auto_return: 'approved',
    notification_url:'https://jsantoshb-mp-ecommerce-nodejs.herokuapp.com/checkout',
    statement_descriptor:'MERCADO_PAGO'
    // expires: true,
    // expiration_date_from: '2016-02-01T12:00:00.000-04:00',
    // expiration_date_to: '2016-02-28T12:00:00.000-04:00'
};

mercadopago.preferences.create(preference)
.then(function(response){
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});