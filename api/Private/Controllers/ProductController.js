/**  
 * @typedef ProductCreateReq
 * @property {integer} brand_id
 * @property {integer} subCategory_id
 * @property {string} name
 * @property {integer} stock
 * @property {integer} price
 * @property {string} description
 */

import ProductService from '../Services/ProductService';
import ProductValidation from '../validation/ProductValidation';
class ProductController{

	/**
	 * @route POST /private/product/
	 * @group Product
	 * @summary Create new product
	 * @param {ProductCreateReq.model} body.body
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async createProduct(req, res){
		try {

			const validation = await ProductValidation.createProductValidation(req.body);

			if (!validation.type)
				return res.status(400).json({type: false, message: validation.message});

			else {
				const result = await ProductService.createProduct(req.body);

				if (result.type) {
					return res.status(200).json({type: result.type, message: result.message, data: result.data});
				}
				else {
					return res.status(400).json({type: false, message: result.message});
				}
			}	
		}
		catch (error) {
			return res.status(400).json({type: false, message: error.message});
		}
	}

	/**
	 * @route GET /private/product/
	 * @group Product
	 * @summary Get all products
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getProducts(req, res){
		try {
			const result = await ProductService.getProducts();

			if (result.type) 
				return res.status(200).json({type: true, message: result.message, data: result.data});
			else
				return res.status(400).json({type: false, message: result.message});	
		}
		catch (error) {
			return res.status(400).json({type: false, message: error.message});
		}
	}

	/**
	 * @route PUT /private/product/delete/{id}
	 * @group Product
	 * @summary Delete specific product
	 * @param {number} id.path
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async deleteProduct(req, res){
		try {
			const validation = await ProductValidation.deleteProductValidation(req.params);

			if (!validation.type)
				res.status(400).json({type: false, message: validation.message});	

			const result = await ProductService.deleteProduct(req.params.id);

			if (result.type) 
				res.status(200).json({type: true, message: result.message, data: result.data});
			else
				res.status(400).json({type: false, message: result.message});	
		}
		catch (error) {
			res.status(400).json({type: false, message: error.message});
		}
	}

	static async health(req, res){
		res.status(200).json({type: true, message: 'successful'});
	}

}

export default ProductController;