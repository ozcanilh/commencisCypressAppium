# Case 1 – Contact Form Test Cases

**Application:** Crown Spa – Appointment Booking Form

---

## Test Suite: Contact Form – Positive Scenarios

---

### TC-001 – Successful form submission with all valid data

**Priority:** Critical

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter a valid first name (e.g., "Jane")
2. Enter a valid last name (e.g., "Doe")
3. Enter a valid email address (e.g., "jane.doe@example.com")
4. Enter a valid phone number (e.g., "+447517766491")
5. Leave service as default ("Body Wrap")
6. Select a valid future weekday date from the calendar
7. Select a valid time (e.g., 10:00 AM)
8. Leave "Send updates on special offers" unchecked
9. Leave Comments field empty
10. Click "Submit"

**Expected Result:**

- 10.1 Form is submitted successfully
- 10.2 No error messages are shown

---

### TC-002 – Successful submission with "Send updates on special offers" checked

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Fill all required fields with valid data
2. Check "Send updates on special offers"
3. Click "Submit"

**Expected Result:**

- 3.1 Form is submitted successfully
- 3.2 "You will receive the latest updates on our special offers and campaigns." message is displayed

---

### TC-003 – Successful submission with maximum length first name (50 characters)

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter exactly 50 alphabetic characters in "First Name" (e.g., "Abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx")
2. Fill remaining required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 Form is submitted successfully

---

### TC-004 – Successful submission with maximum length last name (50 characters)

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter exactly 50 alphabetic characters in "Last Name"
2. Fill remaining required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 Form is submitted successfully

---

### TC-005 – Successful submission with maximum length comment (500 characters)

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Fill all required fields with valid data
2. Enter exactly 500 alphanumeric characters in "Comments"
3. Click "Submit"

**Expected Result:**

- 3.1 Form is submitted successfully

---

### TC-006 – Default service is "Body Wrap"

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Observe the "Which service are you interested in:" dropdown

**Expected Result:**

- 1.1 Default selected value is "Body Wrap"

---

### TC-007 – Select "Body Treatments" service

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Open the service dropdown
2. Select "Body Treatments"
3. Fill remaining required fields with valid data
4. Click "Submit"

**Expected Result:**

- 4.1 Form is submitted with "Body Treatments" selected

---

### TC-008 – Select "Dermatology" service

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Open the service dropdown
2. Select "Dermatology"
3. Fill remaining required fields with valid data
4. Click "Submit"

**Expected Result:**

- 4.1 Form is submitted with "Dermatology" selected

---

### TC-009 – Select "Electrolysis" service

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Open the service dropdown
2. Select "Electrolysis"
3. Fill remaining required fields with valid data
4. Click "Submit"

**Expected Result:**

- 4.1 Form is submitted with "Electrolysis" selected

---

### TC-010 – Calendar shows current month and day by default

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Observe the calendar widget

**Expected Result:**

- 1.1 Calendar displays the current month and year
- 1.2 The current day is highlighted

---

### TC-011 – Default appointment time is 10:00

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Observe the time dropdown

**Expected Result:**

- 1.1 Default selected time is "10:00 AM"

---

### TC-012 – Select each available time slot (10:00–17:00 on a weekday)

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Select a future weekday date
2. Open the time dropdown
3. Verify the following time options are available: 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00

**Expected Result:**

- 3.1 All 8 hourly time slots between 10:00 and 17:00 are selectable

---

### TC-013 – Comments field is optional

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Fill all required fields with valid data
2. Leave Comments field empty
3. Click "Submit"

**Expected Result:**

- 3.1 Form is submitted successfully without a comment

---

## Test Suite: Contact Form – Negative Scenarios

---

### TC-014 – Submit empty form

**Priority:** Critical

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open
3. All fields are empty

**Steps:**

1. Click "Submit" without filling any field

**Expected Result:**

- 1.1 Validation errors are shown for all required fields (First Name, Last Name, Email, Phone, Appointment Date/Time)
- 1.2 Form is not submitted

---

### TC-015 – Submit with empty First Name

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Leave "First Name" empty
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown for the "First Name" field
- 3.2 Form is not submitted

---

### TC-016 – Submit with empty Last Name

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Leave "Last Name" empty
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown for the "Last Name" field
- 3.2 Form is not submitted

---

### TC-017 – Submit with empty Email

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Leave "Email" empty
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown for the "Email" field
- 3.2 Form is not submitted

---

### TC-018 – Submit with empty Phone

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Leave "Phone" empty
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown for the "Phone" field
- 3.2 Form is not submitted

---

### TC-019 – Submit with invalid email – missing "@" symbol

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "janedoeexample.com" in the "Email" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message indicating invalid email format is shown
- 3.2 Form is not submitted

---

### TC-020 – Submit with invalid email – missing domain

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "janedoe@" in the "Email" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message indicating invalid email format is shown
- 3.2 Form is not submitted

---

### TC-021 – Submit with invalid email – missing TLD

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "janedoe@example" in the "Email" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message indicating invalid email format is shown
- 3.2 Form is not submitted

---

### TC-022 – First Name with special characters

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "J@ne!" in the "First Name" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown indicating special characters are not allowed
- 3.2 Form is not submitted

---

### TC-023 – First Name with numbers

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "Jane123" in the "First Name" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown indicating numbers are not allowed
- 3.2 Form is not submitted

---

### TC-024 – Last Name with special characters

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "D\*e&" in the "Last Name" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown indicating special characters are not allowed
- 3.2 Form is not submitted

---

### TC-025 – Last Name with numbers

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "Doe456" in the "Last Name" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown indicating numbers are not allowed
- 3.2 Form is not submitted

---

### TC-026 – First Name exceeding 50 characters

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter 51 alphabetic characters in "First Name"
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 Input is truncated to 50 characters OR an error message is shown
- 3.2 Form is not submitted with more than 50 characters

---

### TC-027 – Last Name exceeding 50 characters

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter 51 alphabetic characters in "Last Name"
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 Input is truncated to 50 characters OR an error message is shown
- 3.2 Form is not submitted with more than 50 characters

---

### TC-028 – Phone without "+" prefix

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "447517766491" (without leading "+") in "Phone"
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown indicating the phone format must be "+XXXXXXXXXXX"
- 3.2 Form is not submitted

---

### TC-029 – Phone exceeding 13 characters

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "+44751776649100" (14 characters) in "Phone"
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 Input is truncated to 13 characters OR an error message is shown
- 3.2 Form is not submitted with more than 13 characters

---

### TC-030 – Phone with letters

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "+44751776ABCD" in "Phone"
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown indicating the phone must contain only digits after "+"
- 3.2 Form is not submitted

---

### TC-031 – Select a past date in the calendar

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. On the calendar widget, attempt to navigate to the previous month
2. Click on a past date

**Expected Result:**

- 2.1 Past dates are disabled/grayed out and cannot be selected, OR an error message is shown when attempting to select a past date

---

### TC-032 – Select a weekend date in the calendar

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. On the calendar widget, attempt to click on a Saturday or Sunday

**Expected Result:**

- 1.1 Weekend dates are disabled/grayed out and cannot be selected
- 1.2 No time slots are available for weekend dates

---

### TC-033 – Comment exceeding 500 characters

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Fill all required fields with valid data
2. Enter 501 alphanumeric characters in "Comments"
3. Click "Submit"

**Expected Result:**

- 3.1 Input is truncated to 500 characters OR an error message is shown
- 3.2 Form is not submitted with more than 500 characters

---

### TC-034 – Submit without selecting an appointment date

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Fill all required fields with valid data except the appointment date
2. Click "Submit"

**Expected Result:**

- 2.1 An error message is shown indicating the appointment date is required
- 2.2 Form is not submitted

---

### TC-035 – Submit without selecting an appointment time

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Fill all required fields with valid data, select a date but clear/deselect the time
2. Click "Submit"

**Expected Result:**

- 2.1 An error message is shown indicating the appointment time is required
- 2.2 Form is not submitted

---

### TC-036 – Select time outside the allowed range

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Select a future weekday date
2. Open the time dropdown and verify no time options exist before 10:00 AM or after 17:00 PM

**Expected Result:**

- 2.1 Times before 10:00 AM and after 17:00 PM are not available in the dropdown

---

### TC-037 – "Send updates" message does NOT appear when checkbox is unchecked

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Fill all required fields with valid data
2. Leave "Send updates on special offers" unchecked
3. Click "Submit"

**Expected Result:**

- 3.1 Form is submitted successfully
- 3.2 "You will receive the latest updates on our special offers and campaigns." message is NOT displayed

---

### TC-038 – Select today's date with a past time

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open
3. Current time is after 10:00 AM

**Steps:**

1. Select today's date from the calendar
2. Select a time slot that has already passed (e.g., if current time is 14:00, select 10:00)
3. Fill all other required fields with valid data
4. Click "Submit"

**Expected Result:**

- 4.1 Past time slots for today are disabled OR an error message is shown
- 4.2 Form is not submitted with a past time on today's date

---

### TC-039 – Service dropdown contains exactly 4 options

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Open the "Which service are you interested in:" dropdown
2. Count and verify the available options

**Expected Result:**

- 2.1 Dropdown contains exactly 4 options: "Body Wrap", "Body Treatments", "Dermatology", "Electrolysis"
- 2.2 Only one option can be selected at a time

---

### TC-040 – First Name with only spaces

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter " " (only spaces) in the "First Name" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown for the "First Name" field
- 3.2 Form is not submitted

---

### TC-041 – Last Name with only spaces

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter " " (only spaces) in the "Last Name" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown for the "Last Name" field
- 3.2 Form is not submitted

---

### TC-042 – Phone with special characters

**Priority:** High

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "+4475177#649!" in "Phone"
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message is shown indicating the phone must contain only digits after "+"
- 3.2 Form is not submitted

---

### TC-043 – Email with spaces

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Enter "jane doe@example.com" in the "Email" field
2. Fill all other required fields with valid data
3. Click "Submit"

**Expected Result:**

- 3.1 An error message indicating invalid email format is shown
- 3.2 Form is not submitted

---

### TC-044 – Navigate calendar to next month and select a weekday

**Priority:** Medium

**Preconditions:**

1. Chrome browser version 120+ or Firefox version 120+
2. Contact form page is open

**Steps:**

1. Click the next month arrow (>) on the calendar widget
2. Select a weekday date in the next month
3. Fill all other required fields with valid data
4. Click "Submit"

**Expected Result:**

- 4.1 Calendar navigates to the next month
- 4.2 Form is submitted successfully with the selected future date
