# MongoDB Configuration Guide

## Where to Change MongoDB URI

### File Location
**`server/server.js`** - Line 18

### Current Setting
```javascript
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/krishi-mitra';
```

## How to Change the MongoDB Connection

### Option 1: Environment Variable (Recommended)
Create a `.env` file in the `server` folder:
```
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

### Option 2: Direct Edit
Edit line 18 in `server/server.js`:
```javascript
const MONGODB_URI = 'mongodb://localhost:27017/your-database-name';
```

## MongoDB Atlas (Cloud Database)
For cloud MongoDB (MongoDB Atlas):
```javascript
const MONGODB_URI = 'mongodb+srv://username:password@cluster.mongodb.net/krishi-mitra';
```

## Collection Name
✅ **Forum questions are now saved in collection named: `forum`**

This is set in `server/models/ForumQuestion.js` line 58:
```javascript
{
    timestamps: true,
    collection: 'forum'  // Collection name
}
```

## Testing the Connection

1. Make sure MongoDB is running locally:
   ```bash
   mongod
   ```

2. Start your server:
   ```bash
   cd server
   npm run dev
   ```

3. You should see:
   ```
   ✅ Connected to MongoDB
   📂 Database: mongodb://localhost:27017/krishi-mitra
   ```

## Viewing Your Data

### Using MongoDB Compass (GUI)
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `krishi-mitra`
4. View collection: `forum`

### Using Command Line
```bash
mongosh
use krishi-mitra
db.forum.find()
```

## What Gets Saved in MongoDB

When a user asks a question in the forum, this data is saved:
- question
- description
- author
- **email** (required, not displayed publicly)
- category
- createdDate
- views
- answers (array)
- isAnswered (boolean)
- timestamps (createdAt, updatedAt)

---

**Admin Password**: `krishi@2026`
