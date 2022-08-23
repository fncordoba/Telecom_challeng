require('dotenv').config()


const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do{

        opt = await inquirerMenu();
        
        switch( opt ) {

            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                console.log(termino, "termino")
                
                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if ( id === '0' ) continue;

                const lugarSel = lugares.find( l => l.id === id );

                // Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );

                // Clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );
                const climas = await busquedas.climasLugar ( lugarSel.lat, lugarSel.lng );

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green );
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Máxima:', clima.max );
                console.log('Como está el clima:',  clima.desc.green );

                console.log('==========================\n'.green);
                console.log('Dia 2:'.white)
                console.log('==========================\n'.green);

                console.log('Temperatura:', climas[0].temp );
                console.log('Mínima:', climas[0].min );
                console.log('Máxima:', climas[0].max );
                console.log('Como está el clima:',  climas[0].desc.green );

                console.log('==========================\n'.green);
                console.log('Dia 3:'.white)
                console.log('==========================\n'.green);

                console.log('Temperatura:', climas[1].temp );
                console.log('Mínima:', climas[1].min );
                console.log('Máxima:', climas[1].max );
                console.log('Como está el clima:',  climas[1].desc.green );

                console.log('==========================\n'.green);
                console.log('Dia 4:'.white)
                console.log('==========================\n'.green);

                console.log('Temperatura:', climas[2].temp );
                console.log('Mínima:', climas[2].min );
                console.log('Máxima:', climas[2].max );
                console.log('Como está el clima:',  climas[2].desc.green );

                console.log('==========================\n'.green);
                console.log('Dia 5:'.white)
                console.log('==========================\n'.green);

                console.log('Temperatura:', climas[3].temp );
                console.log('Mínima:', climas[3].min );
                console.log('Máxima:', climas[3].max );
                console.log('Como está el clima:',  climas[3].desc.green );


            break;


            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) =>  {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${ idx } ${ lugar } ` );
                })

            break;

        }



        if ( opt !== 0 ) await pausa();

    } while ( opt !== 0 )



}



main();