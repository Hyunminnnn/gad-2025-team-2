# WorkFair - Quick Start Guide

Get up and running in 5 minutes! 🚀

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+

## Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Step 2: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Seed database with test data
python -m app.seed
```

Expected output:
```
✅ Database seeded successfully!

Test accounts:
  Jobseeker: seeker1@example.com / password123
  Employer: employer1@example.com / password123
```

## Step 3: Start Backend Server

```bash
# Make sure you're in the backend directory with venv activated
uvicorn app.main:app --reload
```

Backend runs at: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

## Step 4: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Frontend runs at: **http://localhost:5173**

## Step 5: Open Your Browser

Navigate to **http://localhost:5173**

You should see the WorkFair home page! 🎉

## Test Login

Use these credentials to log in:

**Jobseeker Account:**
- Email: `seeker1@example.com`
- Password: `password123`

**Employer Account:**
- Email: `employer1@example.com`
- Password: `password123`

## Mobile Testing

The app is designed for mobile-first (375px width).

**Chrome DevTools:**
1. Press F12
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select "iPhone SE" or set to 375px width

## What to Explore

✅ **Home Page** - Browse jobs, see application stats
✅ **Job Details** - Click any job card
✅ **Filter Page** - Navigate to `/filters/talent`
✅ **Apply Flow** - Click "Apply" on a job (handles duplicates!)
✅ **Responsive Design** - Resize browser to see mobile → desktop

## Troubleshooting

**Backend won't start:**
```bash
# Check if port 8000 is in use
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process or change port in uvicorn command
```

**Frontend won't start:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Database issues:**
```bash
# Delete and recreate
rm backend/workfair.db
python -m app.seed
```

**CORS errors:**
- Make sure backend is running first
- Check that frontend is on http://localhost:5173

## Next Steps

1. Read the main [README.md](./README.md) for full documentation
2. Explore the [API docs](http://localhost:8000/docs)
3. Check out the code structure in `/src` and `/backend/app`
4. Customize the theme in `src/theme/tokens.ts`

## Development Tips

**Hot reload is enabled:**
- Frontend: Changes auto-reload instantly
- Backend: API changes auto-reload with `--reload` flag

**Check network tab:**
- Open DevTools → Network
- See all API calls in real-time

**Useful commands:**
```bash
# Frontend
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Check code quality

# Backend
python -m app.seed # Re-seed database
# (add your own commands as needed)
```

---

**Questions?** Check the main README or open an issue on GitHub.

Happy coding! 💚

