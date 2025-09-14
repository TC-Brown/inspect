# Inspect - Facility Inspection Scorecard Application

This is a Flask web application for creating facility inspection scorecards with interactive star ratings, automatic scoring, and printable reports. The application tracks cleaning and maintenance compliance across multiple facility areas.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
1. **Install Python dependencies**: `pip3 install -r requirements.txt` - takes ~30 seconds
2. **Verify installation**: `python3 -c "import flask; print('Flask import successful')"` - takes <1 second
3. **Run the application**: `python3 app.py` - starts in ~2 seconds, runs on http://127.0.0.1:5000

### Development Workflow
- **Start development server**: `python3 app.py` (runs with debug mode enabled)
- **Access application**: Navigate to http://127.0.0.1:5000 in browser
- **Stop server**: Use Ctrl+C in the terminal where the server is running

### File Structure Overview
```
├── app.py                    # Main Flask application (single route)
├── requirements.txt          # Python dependencies (only Flask>=2.0.0)
├── templates/
│   └── inspection.html       # Main application template
└── static/
    ├── js/
    │   └── inspection.js     # Application logic and interactivity
    └── css/
        └── style.css         # Custom styles (works with TailwindCSS CDN)
```

## Validation and Testing

### Manual Validation Requirements
After making any changes, **ALWAYS** perform this complete validation scenario:

1. **Start the application**: `python3 app.py`
2. **Access the web interface**: http://127.0.0.1:5000
3. **Fill out inspection details**:
   - Enter inspector name (e.g., "John Doe")
   - Set inspection date (e.g., current date)
   - Enter office location (e.g., "Main Office")
4. **Test star rating system**:
   - Click different star ratings for various inspection items
   - Verify stars highlight correctly when clicked
   - Ensure ratings persist when clicking other items
5. **Test scoring functionality**:
   - Click "Calculate Score" button
   - Verify overall score calculation appears (format: "X / Y")
   - Check that rating badge updates (Excellent/Good/Needs Improvement)
6. **Test form features**:
   - Add comments in textarea fields
   - Test "Reset Form" button clears all data
   - Test "Save & Print" opens browser print dialog
7. **Verify responsive design**: Resize browser window to test mobile/tablet layouts

### Code Quality Checks
- **Python syntax check**: `python3 -m py_compile app.py` - takes <1 second
- **No formal linters configured** - follow existing code style in the repository
- **JavaScript/HTML validation**: Check browser console for errors when testing

## Application Architecture

### Backend (Flask)
- **Single route application**: Only serves the main inspection form at "/"
- **No database**: All data is client-side only
- **Development mode**: Debug mode enabled by default for development
- **Static file serving**: Flask serves CSS/JS files from static/ directory

### Frontend (JavaScript)
- **Dynamic content generation**: Inspection areas and items rendered by JavaScript
- **Interactive star ratings**: Click-based 1-5 star rating system
- **Real-time scoring**: Score calculation and rating updates
- **Print functionality**: Generates printable report format
- **Form management**: Reset, calculate, and save operations

### Key JavaScript Functions (static/js/inspection.js)
- `renderScoringSections()`: Generates inspection area forms
- `calculateScore()`: Computes overall score and rating
- `resetForm()`: Clears all form data
- `saveAndPrint()`: Generates printable report and opens print dialog

### Styling
- **Primary framework**: TailwindCSS (loaded from CDN)
- **Custom styles**: Additional styling in static/css/style.css
- **Print styles**: Specific CSS for print media
- **Responsive design**: Mobile-first responsive layout

## Common Development Tasks

### Adding New Inspection Areas
1. **Edit static/js/inspection.js**
2. **Modify the `areas` array** (around line 3-47)
3. **Add new area object** with title, id, and items array
4. **Test the new area** appears and functions in the web interface

### Modifying Scoring Logic  
1. **Edit `calculateScore()` function** in static/js/inspection.js
2. **Current logic**: 5-point scale per item, percentage-based ratings
3. **Rating thresholds**: ≥90% = Excellent, ≥70% = Good, <70% = Needs Improvement

### Styling Changes
1. **For utility classes**: Modify HTML classes (TailwindCSS)
2. **For custom styles**: Edit static/css/style.css
3. **Test changes**: Refresh browser after modifications

### Backend Modifications
1. **Route changes**: Edit app.py (currently only has root route)
2. **Template changes**: Modify templates/inspection.html
3. **Static files**: Add/modify files in static/ directory

## Troubleshooting

### Common Issues
- **Port already in use**: Kill existing Flask processes or change port
- **CSS not loading**: Check browser network tab for CDN connectivity issues
- **JavaScript errors**: Open browser console to see error messages
- **Print not working**: Ensure popup blocker allows print dialog

### Dependencies
- **Python version**: Tested with Python 3.12.3 (should work with 3.7+)
- **Flask version**: Requires Flask>=2.0.0 
- **Browser requirements**: Modern browser with JavaScript enabled
- **External dependencies**: TailwindCSS CDN, Google Fonts CDN

### Performance Notes
- **Application startup**: ~2 seconds
- **Page load time**: <1 second (depending on CDN response)
- **No build process**: Direct file serving, no compilation needed
- **No database queries**: All operations are client-side

## Key Areas of the Codebase

### Critical Files to Understand
- **`app.py`**: Minimal Flask app - modify for new routes or backend logic  
- **`templates/inspection.html`**: Main UI structure and layout
- **`static/js/inspection.js`**: Core application functionality and business logic
- **`static/css/style.css`**: Custom styling and print media queries

### Inspection Areas Covered
1. **Waiting Room & Reception** (5 items)
2. **Exam Rooms** (5 items)  
3. **Restrooms** (5 items)
4. **Staff Areas** (5 items)

### Data Flow
1. User interaction → JavaScript event handlers
2. Star ratings → Rating input values  
3. Calculate button → Score computation
4. Save & Print → HTML report generation → Print dialog

This application requires no build process, database setup, or complex configuration - it's designed to run immediately after installing Flask.