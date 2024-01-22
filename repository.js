const fs = require('fs');
getAllDonations = () => {
    let data = '';
    return new Promise((resolve, reject) => {
        fs.createReadStream('donations.json', 'utf8')
            .on('error', error => {
                reject(error);
            })
            .on('data', chunk => {
                data += chunk;
            })
            .on('end', () => {
                resolve(data);
            });
    });
}
getAllDonationsById = (queryId) => {
    let data = '';
    return new Promise((resolve, reject) => {
        fs.createReadStream('donations.json', 'utf8')
            .on('error', error => {
                reject(error);
            })
            .on('data', chunk => {
                data += chunk;
            })
            .on('end', () => {
                try {
                    data = JSON.parse(data);
                    let filteredData = data.find(item => item.id == queryId);
                    filteredData = JSON.stringify(filteredData);
                    resolve(filteredData);
                } catch (parseError) {
                    reject(parseError);
                }
            });
    });

}

createDonation = async (value) => {
    let data = await getAllDonations();
    data = JSON.parse(data);
    let id = data.length + 1;
    data.push({ id, ...value });
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream('donations.json', 'utf8')
        writeStream.on('error', error => {
            reject(error);
        });
        data = JSON.stringify(data);
        writeStream.write(data);
        writeStream.end();
        writeStream.on('finish', () => {
            resolve(id);
        });
    });
}
deleteDonation = async (value) => {
    let data = await getAllDonations();
    return new Promise((resolve, reject) => {
        data = JSON.parse(data);
        const { id } = value;
        if (!data.find(item => item.id === id)) {
            reject(new Error("ID not found"));
        }
        data = data.filter((item) => {
            return item.id !== id;
        });
        const writeStream = fs.createWriteStream('donations.json', 'utf8')
        writeStream.on('error', error => {
            reject(error);
        });
        data = JSON.stringify(data);
        writeStream.write(data);
        writeStream.end();
        writeStream.on('finish', () => {
            resolve(true);
        });
    });
}
updateDonation = async (value) => {
    let data = await getAllDonations();
    return new Promise((resolve, reject) => {
        data = JSON.parse(data);
        const { id, items } = value;
        if (!data.find(item => item.id === id)) {
            reject(new Error("ID not found"));
        }
        data = data.map((item) => {
            if (item.id === id) {
                return { id, items };
            }
            return item;
        });
        const writeStream = fs.createWriteStream('donations.json', 'utf8')
        writeStream.on('error', error => {
            reject(error);
        });
        data = JSON.stringify(data);
        writeStream.write(data);
        writeStream.end();
        writeStream.on('finish', () => {
            resolve(true);
        });
    });
}
module.exports = { getAllDonations, getAllDonationsById, createDonation, deleteDonation, updateDonation };