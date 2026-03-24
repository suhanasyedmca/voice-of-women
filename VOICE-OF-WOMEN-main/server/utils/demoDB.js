import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('demo_db.json');

const loadDB = () => {
    try {
        if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.error('Error loading demo_db.json', e);
    }
    return { users: [], otps: [] };
};

const saveDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error saving demo_db.json', e);
    }
};

export const DemoDB = {
    getUsers: () => loadDB().users,
    saveUser: (user) => {
        const db = loadDB();
        db.users.push(user);
        saveDB(db);
    },
    updateUser: (userId, updates) => {
        const db = loadDB();
        const index = db.users.findIndex(u => u._id === userId);
        if (index !== -1) {
            db.users[index] = { ...db.users[index], ...updates };
            saveDB(db);
            return true;
        }
        return false;
    },
    findUserByEmail: (email) => loadDB().users.find(u => u.email === email),
    findUserById: (id) => loadDB().users.find(u => u._id === id),
    
    saveOTP: (identifier, otpData) => {
        const db = loadDB();
        // Remove old ones for this identifier
        db.otps = db.otps.filter(o => o.identifier !== identifier);
        db.otps.push({ identifier, ...otpData });
        saveDB(db);
    },
    getOTP: (identifier) => {
        const db = loadDB();
        return db.otps.find(o => o.identifier === identifier);
    },
    deleteOTP: (identifier) => {
        const db = loadDB();
        db.otps = db.otps.filter(o => o.identifier !== identifier);
        saveDB(db);
    }
};
