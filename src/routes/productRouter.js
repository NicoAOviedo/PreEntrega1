import { Router } from "express";
import { ProductManager } from "../productManager/productManager.js";

const router = Router();
const ProductManager = new ProductManager('./productManager/db.json');

router.get('/', async(req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const prod = await productManager.getProducts();
        const limitProd = limit >= 0 ? limit : prod.length;
        res.send(prod.slice(0, limitProd));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error de datos');
    }
})
router.post('/', async (req, res) =>{
    try{
        const {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock, 
            category
        } = req.body;
        await productManager.addProduct(title, description, price, thumbnail, code, stock, category);
        res.send("Prod Agregado");
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error de datos');
    }

})
router.get('/:pid', async (req, res) => {
    try {
        const prodID = parseInt(req.params.pid)
        const prod = await productManager.getProductByID(prodID);
        res.send(prod);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error de datos');
    }
})
router.put("/:pid", async (req, res) =>{
    try{
        const prodID = parseInt(req.params.pid);
        const newObject = req.body;
        await productManager.updateProduct(prodID, newObject);
        res.send("Prod. actualizado");
    }catch(error){
        console.error(error);
        res.status(500).send('Error de datos');
    }
})
router.delete("/:pid", async (req, res) => {
    try{
        const prodID = parseInt(req.params.pid);
        const prodDelete = await productManager.deleteProduct(prodID);
        if(!prodDelete){
            res.send("Prod. eliminado")
        }else{
            res.send("El prod. no existe")
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Error de datos');
    }
})
export default router;