/************* CONTROLADOR TRAMITES ******************/


// importa logica de el dominio
import { prisma } from '../database.js';
import { resp } from '../domain/genRes.js';

// exporta logica para los diferentes CRUD endpoints

//obtiene todos

  export const getTramites = async (req, res, next) => {    
    try {
      const tramites = await prisma.tramites.findMany({
      
      });
      res.json(tramites);
    } catch (error) {
      next(error);
    }
       
    };

//obtiene uno

  export const getTramite = () => {    
    const resx = resp()
      response.status = 200;
      response.body = {
        success: true,
        data: resx,
      };
    };

//agrega uno

    export const addTramite = async (req, res, next) => {    
      console.log(req.body)
      try {
        const newTramite =  await prisma.tramites.create({
          data: req.body
        });
        res.json(newTramite);
        
      } catch (error) {
        res.json(error)
        next(error);        
      }
      
      };
// actualiza uno

      export const updateTramite = async (req, res, next) => {    
        try {
          const tramites = await prisma.tramite.update({
          where:{
            id: parseInt(req.params.id)
          }, data: req.body
          });
          res.json(tramites);
        } catch (error) {
          next(error);
        }
        };

// elimina uno       

// export const deleteTramite = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const deletedTramite = await prisma.tramites.delete({
//       where: { id: parseInt(id) },
//     });

//     res.json(deletedTramite);
//   } catch (error) {
//     next(error);
//   }
// }  

