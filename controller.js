const repository = require('./repository');
const getAllDonations = async (req, res) => {
    try {
        const data = await repository.getAllDonations();
        if (data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
        else {
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "No data found" }));
        }

    }
    catch (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
    }

}
const getAllDonationsById = async (req, res, queryId) => {
    try {
        const data = await repository.getAllDonationsById(queryId);
        if (data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
        else {
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "No data found" }));
        }
    }
    catch (err) {
        console.log(err);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
    }
}
const createDonation = (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', async () => {
        try {
            await repository.createDonation(JSON.parse(data));
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Donation created successfully" }));

        }
        catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
    });


}
const deleteDonation = (req, res) => {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', async () => {
        try {
            await repository.deleteDonation(JSON.parse(data));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Donation deleted successfully" }));

        }
        catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
    });
}
const updateDonation = (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', async () => {
        try {
            await repository.updateDonation(JSON.parse(data));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Donation updated successfully" }));

        }
        catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
    });

}
module.exports = { getAllDonations, getAllDonationsById, createDonation, deleteDonation, updateDonation };