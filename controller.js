const repository = require('./repository');
const { logSuccess, logError } = require('./logger');
const getAllDonations = async (req, res) => {
    try {
        const data = await repository.getAllDonations();
        if (data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
            logSuccess.info(`Response status: ${res.statusCode}`);
        }
        else {
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "No data found" }));
            logSuccess.info(`Response status: ${res.statusCode}`);
        }

    }
    catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err.message }));
        logError.error(`Response status: ${res.statusCode}`);
    }

}
const getAllDonationsById = async (req, res, queryId) => {
    if (!queryId) {
        {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "missing ID" }));
            logError.error(`Response status: ${res.statusCode}`);
        }
    }
    else {
        try {
            const data = await repository.getAllDonationsById(queryId);
            if (data) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
                logSuccess.info(`Response status: ${res.statusCode}`);
            }
            else {
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "No data found" }));
                logSuccess.info(`Response status: ${res.statusCode}`);
            }
        }
        catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
            logError.error(`Response status: ${res.statusCode}`);
        }
    }
}
const createDonation = (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', async () => {
        if (!data) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "missing data" }));
            logError.error(`Response status: ${res.statusCode}`);
        }
        else {
            try {
                await repository.createDonation(JSON.parse(data));
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Donation created successfully" }));
                logSuccess.info(`Response status: ${res.statusCode}`);

            }
            catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: err.message }));
                logError.error(`Response status: ${res.statusCode}`);
            }
        }
    });


}
const deleteDonation = (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', async () => {
        if (!data) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "missing data" }));
            logError.error(`Response status: ${res.statusCode}`);
        }
        else {
            try {
                await repository.deleteDonation(JSON.parse(data));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Donation deleted successfully" }));
                logSuccess.info(`Response status: ${res.statusCode}`);

            }
            catch (err) {
                if (err.message === "ID not found") {
                    res.writeHead(204, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    logError.error(`Response status: ${res.statusCode}`);
                }
                else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    logError.error(`Response status: ${res.statusCode}`);
                }
            }
        }
    });
}
const updateDonation = (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', async () => {
        if (!data) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "missing data" }));
            logError.error(`Response status: ${res.statusCode}`);
        }
        else {
            try {
                await repository.updateDonation(JSON.parse(data));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Donation updated successfully" }));
                logSuccess.info(`Response status: ${res.statusCode}`);

            }
            catch (err) {
                if(err.message==="ID not found"){
                    res.writeHead(204, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    logError.error(`Response status: ${res.statusCode}`);
                }
                else{
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    logError.error(`Response status: ${res.statusCode}`);
                }
            }
        }
    });

}
module.exports = { getAllDonations, getAllDonationsById, createDonation, deleteDonation, updateDonation };