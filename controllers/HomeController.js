const db = require('../models');


exports.dropDownData = async function (req, res) {
    try {

        const { type } = req.query;
        let data = [];
        switch (type) {
            case "product":
                data = await db.Product.findAll({
                    attributes: ['id', ['name', 'label']],
                    order: [
                        ['id', 'DESC']
                    ],
                    where: {
                        status: 1
                    }
                });
                break;
            case "supplier":
                data = await db.Supplier.findAll({
                    attributes: ['id', ['name', 'label']],
                    order: [
                        ['id', 'DESC']
                    ],
                    where: {
                        status: 1
                    }
                });
                break;
        }

        res.json({
            message: 'Dropdown data.',
            data: data,
            status: true
        });

    } catch (err) {
        res.json({
            message: err,
            status: false
        });
    }
}