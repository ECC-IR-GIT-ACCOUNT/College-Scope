# How to Add New Options

This guide explains how to add new data field options to the college data application.

## Quick Steps

1. Switch to the `prod` branch in GitHub
2. Navigate to `frontend/src/options.json`
3. Add your new option following the required format
4. Commit and push your changes

## Step-by-Step Process

### 1. Access the Options File

1. **Switch to prod branch:**
   - Go to your GitHub repository
   - Click on the branch dropdown (usually shows "main" or current branch)
   - Select `prod` branch

2. **Navigate to the options file:**
   ```
   frontend/ → src/ → options.json
   ```

### 2. Understanding the Format

Each option in the array follows this exact structure:

```json
{
  "value": "data.field.path",
  "label": "Human-Readable Description"
}
```

**Required Fields:**
- `value`: The data field path or identifier used by the application
- `label`: User-friendly display name shown in the interface

### 3. Adding a New Option

Add your new option to the JSON array following the existing pattern:

```json
[
  {"value": "id", "label": "Unit ID for Institution"},
  {"value": "school.name", "label": "School Name"},
  {"value": "latest.student.size", "label": "Total Degree Seeking Students"},
  // ... existing options ...
  {"value": "your.new.field.path", "label": "Your New Field Description"}
]
```

## Field Structure

**Value Field:**
- The exact API parameter name that will be sent to retrieve data
- Must match the API field structure exactly
- Used internally by the application

**Label Field:**
- User-friendly display name shown in the interface
- Should be clear and descriptive for end users
- Not used in API calls, only for display purposes

## Validation Checklist

Before adding a new option, verify:

- [ ] The `value` field corresponds to an actual data field in your API/database
- [ ] The `label` is user-friendly and descriptive
- [ ] JSON syntax is correct (proper commas, quotes, brackets)
- [ ] The new option is placed appropriately in the array
- [ ] No duplicate values exist

## Example Addition

You can find available API field names in the [College Scorecard API Documentation](https://collegescorecard.ed.gov/data/api-documentation).

**Before:**
```json
[
  {"value": "latest.student.demographics.student_faculty_ratio", "label": "Student-to-Faculty Ratio"},
  {"value": "latest.student.part_time_share", "label": "Share of Part-Time Students"}
]
```

**After:**
```json
[
  {"value": "latest.student.demographics.student_faculty_ratio", "label": "Student-to-Faculty Ratio"},
  {"value": "latest.student.part_time_share", "label": "Share of Part-Time Students"},
  {"value": "new.api.field.name", "label": "New Field Display Name"}
]
```

## Testing Your Addition

After adding a new option:

1. **Commit your changes** directly on GitHub
2. **Wait for deployment**: After making changes on GitHub, wait a few seconds for the new deployment to start on render.com
3. **Test the new option**:
   - Go to the application
   - Type a school name in the search
   - Select your new option from the dropdown
   - Verify that the data displays correctly

Additional checks:
- Verify the JSON file is valid (no syntax errors)
- Check that the label displays correctly in the dropdown
- Confirm that selecting the option retrieves the expected data

## Common Issues

**JSON Syntax Errors:**
- Missing commas between objects
- Missing quotes around strings
- Incorrect bracket placement

**Data Issues:**
- Value doesn't match the exact API field name
- API field doesn't exist or returns no data

**Display Issues:**
- Label is too long for the interface
- Label is unclear or confusing to users