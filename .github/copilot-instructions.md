# Inspection Scorecard Application

The Inspection Scorecard is a Flask web application for facility compliance and safety inspections. It provides an interactive form with star ratings for different areas (Waiting Room, Exam Rooms, Restrooms, Staff Areas) and generates printable inspection reports.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Setup and Dependencies
- Install Python dependencies: `pip3 install -r requirements.txt` -- takes 6 seconds. NEVER CANCEL.
- Install linting tools (optional): `pip3 install flake8` -- takes 2 seconds.

### Running the Application
- Start development server: `python3 app.py` -- starts in 5 seconds at http://127.0.0.1:5000
- Alternative Flask CLI method: `python3 -m flask --app app run` -- equivalent startup time
- Alternative with debug mode: `python3 -m flask --app app run --debug`
- Server runs on port 5000 by default, change with `--port` option

### Code Quality and Linting  
- Run linting: `flake8 app.py` -- takes 0.5 seconds. Fix style issues before committing.
- Run linting on all Python files: `flake8 .` -- takes under 1 second
- Check Python syntax: `python3 -m py_compile app.py` -- takes under 0.5 seconds

## Validation Scenarios

**CRITICAL**: After making any changes to the application, ALWAYS run through these complete end-to-end validation scenarios:

### Complete Inspection Workflow Test
1. Start the application: `python3 app.py`
2. Navigate to http://127.0.0.1:5000 in browser
3. Fill out the Inspection Details form:
   - Inspector Name: "Test Inspector"  
   - Date of Inspection: current date
   - Office/Clinic Location: "Test Location"
4. Rate at least one item in each section by clicking on star ratings (1-5 stars)
5. Click "Calculate Score" button - verify score displays as "X / 100" format
6. Verify overall rating appears (Excellent, Good, Needs Improvement, Poor)
7. Add comments to at least one section
8. Click "Save & Print" button - verify print dialog appears
9. Click "Reset Form" button - verify all fields clear

### UI Functionality Test
- Verify all star rating interactions work (clicking stars highlights correctly)
- Verify form inputs accept text properly
- Verify responsive layout on different screen sizes
- Verify all buttons are functional and provide appropriate feedback

## Repository Structure

```
/
├── app.py                     # Main Flask application (13 lines)
├── requirements.txt           # Python dependencies (Flask>=2.0.0)
├── templates/
│   └── inspection.html        # Main HTML template with TailwindCSS
├── static/
│   ├── css/
│   │   └── style.css         # Custom styles for star ratings and print
│   └── js/
│       └── inspection.js     # JavaScript for scoring logic and interactions
└── .github/
    └── copilot-instructions.md
```

### Key Files Description

**app.py**: Simple Flask application with single route serving inspection.html template. Configures static and template folders.

**templates/inspection.html**: Main HTML template using TailwindCSS CDN for styling. Contains form sections for inspection details and dynamic scoring areas populated by JavaScript.

**static/js/inspection.js**: Core JavaScript containing:
- `areas` array defining inspection sections and checklist items
- `renderScoringSections()` - dynamically generates star rating interfaces
- `calculateScore()` - computes scores and ratings based on star selections
- `saveAndPrint()` - generates printable reports
- Event handlers for star ratings, buttons, and form interactions

**static/css/style.css**: Custom CSS for star styling, print media queries, and responsive design enhancements.

## Common Development Tasks

### Making Code Changes
- ALWAYS test changes by running the complete validation scenario above
- Run linting before committing: `flake8 .`
- Test both the web interface functionality and print generation
- Verify responsive design works by resizing browser window

### Debugging Issues
- Check browser console for JavaScript errors (F12 Developer Tools)
- Verify Flask server logs for Python errors
- Test with different browsers if CSS/JS issues occur
- Use browser developer tools to inspect element interactions

### Adding New Features
- New inspection areas: modify `areas` array in `static/js/inspection.js`
- UI changes: edit `templates/inspection.html` template
- Styling changes: modify `static/css/style.css` or TailwindCSS classes
- Backend changes: modify `app.py` (rare - application is primarily frontend)

## Technical Details

### Technology Stack
- **Backend**: Flask 3.1.2 (Python web framework)
- **Frontend**: HTML5, JavaScript (ES6), TailwindCSS 
- **Styling**: TailwindCSS CDN + custom CSS for print styles
- **Dependencies**: Only Flask (see requirements.txt)

### Browser Compatibility
- Modern browsers supporting ES6 JavaScript
- Print functionality tested in Chrome, Firefox, Safari
- Responsive design works on mobile and desktop

### Performance Notes
- Application loads instantly (static files served by Flask)
- No database - all data handled in browser JavaScript
- Print generation happens client-side via JavaScript

## Troubleshooting

### Common Issues
- **Port already in use**: Use `python3 -m flask --app app run --port 5001`
- **Module not found**: Run `pip3 install -r requirements.txt`
- **Permission denied**: Use `python3` instead of `python`
- **Stars not working**: Check browser console for JavaScript errors
- **Print not working**: Ensure browser allows pop-ups for print dialog

### External Dependencies
- **TailwindCSS**: Loaded from CDN (https://cdn.tailwindcss.com)
- **Google Fonts**: Inter font loaded from Google Fonts CDN
- **Note**: Application may have limited styling if CDN access is blocked

## Development Workflow

1. Make changes to code
2. Run `flake8 .` to check code style
3. Start application: `python3 app.py`  
4. Run complete validation scenario (see above)
5. Test print functionality
6. Verify responsive design
7. Commit changes only after successful validation

This application is simple but critical for facility inspections. Always prioritize thorough testing of the complete user workflow to ensure reliability.