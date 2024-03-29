import db from '../../src/models';

class BrandService{

	static async createBrand(body){
		try {
			const result = await db.Brands.create({
				name: body.name
			});

			if (!result)
				return ({ type: false, message: 'brand not created.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * @route GET /private/brand/list
	 * @group Brand
	 * @summary Get all brands
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getBrands(){
		try {
			const result = await db.Brands.findAll({
				where: {
					isDeleted: 0
				},
				attributes: [ 'id', 'name', 'isDeleted' ]
			});

			if (!result)
				return ({ type: false, message: 'not found.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

	static async deleteBrand(id){
		try {
			const result = await db.Brands.update({
				isDeleted: 1
			}, {
				where: {
					id: id
				}
			}
			);

			console.log(result);

			if (!result)
				return ({ type: false, message: 'not deleted.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

	static async updateBrand(id, body){
		try {

			const result = await db.Brands.update({
				name: body.name
			}, {
				where: {
					id: id
				}
			});

			if (!result)
				return ({ type: false, message: 'not updated.' });
	
			return ({ type: true, message: 'successful', data: result });
		}
		catch (error) {
			throw error;
		}
	}

}

export default BrandService;