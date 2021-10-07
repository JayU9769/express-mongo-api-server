

exports.dropDownData = async function (req, res) {
    try {

        const { type } = req.query;
        let data = [];
        switch (type) {
            case "":
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